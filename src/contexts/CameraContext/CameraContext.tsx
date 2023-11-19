/**
 * @file CameraContext.tsx
 * @description Context for camera related functions
 */
import { Camera, CameraType } from "expo-camera";
import { FlipType, SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { createContext, useContext, useEffect, useState } from "react";
import { ICameraDimensions, IPrediction } from "../../config";
import { ICameraContext, IPredictionResponse } from "./CameraContext.types";

import { useWindowDimensions } from "react-native";
import { IProps, globalConfig } from "../../config";
import { CameraPage } from "../../pages/CameraPage/CameraPage";
import { authFetch } from "../AuthFetch";
import { ErrorContext } from "../ErrorContext";
import { LoadingContext } from "../LoadingContext";
import { ICameraOptions, OptionsContext } from "../OptionsContext";
import { PermissionsContext } from "../PermissionsContext";
import { calculateHeightFromWidth } from "./CameraContext.utils";

const defaultCameraDimensions: ICameraDimensions = {
  width: 0,
  height: 0,
};

const defaultCameraContext: ICameraContext = {
  cameraDimensions: defaultCameraDimensions,
  cameraRef: null,
  capturedPhoto: null,
  predictions: [],
  toggleCameraType: () => {},
  handleTakePicture: () => {},
  setCameraRef: (_) => {},
  resetCamera: () => {},
};

/**
 * @object
 *
 * Camera context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for the camera
 * used on the {@link CameraPage}.
 *
 * @example
 * import { CameraContext } from "../contexts/CameraContext/CameraContext";
 *
 * const CameraPage = () => {
 *  const CameraCon = useContext(CameraContext);
 *
 *  return (...)
 * };
 *
 * @see {@link ICameraContext} for more information on the context object
 */
const CameraContext = createContext<ICameraContext>(defaultCameraContext);

/**
 * @component
 *
 * Camera provider component.
 *
 * @description
 *
 * This component provides the {@link CameraContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { CameraProvider } from './CameraProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <CameraProvider>
 *      <SomeOtherComponent />
 *    </CameraProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link CameraContext} for the context object.
 */
const CameraProvider = ({ children }: IProps) => {
  // Camera related
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [cameraDimensions, setCameraDimensions] = useState<ICameraDimensions>(
    defaultCameraDimensions
  );

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);

  const { width } = useWindowDimensions();

  const ErrorCon = useContext(ErrorContext);
  const LoadingCon = useContext(LoadingContext);
  const OptionsCon = useContext(OptionsContext);
  const PermissionsCon = useContext(PermissionsContext);

  useEffect(() => {
    const height = calculateHeightFromWidth(
      OptionsCon.cameraOptions.ratio,
      width
    );
    setCameraDimensions((prev) => {
      return { ...prev, width: width, height: height };
    });
  }, [OptionsCon.cameraOptions.ratio]);

  const toggleCameraType = () => {
    // @ts-ignore
    OptionsCon.setCameraOptions((prev: ICameraOptions) => {
      return {
        ...prev,
        type:
          prev.type === CameraType.back ? CameraType.front : CameraType.back,
      } as ICameraOptions;
    });
  };

  const takePicture = async () => {
    if (capturedPhoto !== null) {
      resetCamera();
      return;
    }
    if (!PermissionsCon.cameraPermission) {
      ErrorCon.displayError("No permissions granted for camera usage.");
      return;
    }
    if (!cameraRef) {
      ErrorCon.displayError("Camera is not initialized.");
      return;
    }

    await cameraRef
      .takePictureAsync({
        quality: Number(OptionsCon.cameraOptions.quality),
        base64: true,
        skipProcessing: true,
      })
      .then(async (photo) => {
        await cameraRef.pausePreview();

        // If camera is front we have to flip
        if (OptionsCon.cameraOptions.type === CameraType.front) {
          photo = await manipulateAsync(
            photo.uri,
            [{ rotate: 180 }, { flip: FlipType.Vertical }],
            { compress: 1, format: SaveFormat.PNG, base64: true }
          );
        }

        await authFetch
          .post(globalConfig.paths.object_detection + "/capturePhoto", {
            file: photo.base64,
            doSave: OptionsCon.serverOptions.savePhoto,
          })
          .then(async (response) => {
            const new_predictions: IPrediction[] = [];
            await response.data.forEach((element: IPredictionResponse) => {
              new_predictions.push({
                ...element,
                box: {
                  x:
                    ((element.box.x1 + element.box.x2) / 2) *
                    cameraDimensions.width,
                  y:
                    ((element.box.y1 + element.box.y2) / 2) *
                    cameraDimensions.height,
                  width:
                    (element.box.x2 - element.box.x1) * cameraDimensions.width,
                  height:
                    (element.box.y2 - element.box.y1) * cameraDimensions.height,
                },
              });
            });

            setCapturedPhoto(photo.uri);
            setPredictions(new_predictions);
          })
          .catch(() => {
            return;
          });
      })
      .catch((error: any) => {
        cameraRef.resumePreview();

        ErrorCon.displayError(
          `Something went terribly wrong. \n ${error}`,
          "error"
        );
        return;
      });
  };

  const handleTakePicture = async () => {
    LoadingCon.setLoading(true);
    await takePicture();
    LoadingCon.setLoading(false);
  };

  const resetCamera = () => {
    LoadingCon.setLoading(true);
    setCapturedPhoto(null);
    setPredictions([]);
    LoadingCon.setLoading(false);
  };

  return (
    <CameraContext.Provider
      value={{
        cameraDimensions,
        cameraRef,
        capturedPhoto,
        predictions,
        toggleCameraType,
        handleTakePicture,
        setCameraRef,
        resetCamera,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export { CameraContext, CameraProvider };
