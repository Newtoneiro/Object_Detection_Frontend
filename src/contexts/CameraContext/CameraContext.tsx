import { Camera, CameraType } from "expo-camera";
import { FlipType, SaveFormat, manipulateAsync } from "expo-image-manipulator";
import {
  ICameraContext,
  ICameraDimensions,
  ICameraOptions,
  IPrediction,
  IPredictionResponse,
} from "./CameraContext.types";
import { createContext, useContext, useEffect, useState } from "react";

import { AuthFetchContext } from "../AuthFetchContext/AuthFetchContext";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import { calculateHeightFromWidth } from "./CameraContext.utils";
import config from "../../config";
import { useWindowDimensions } from "react-native";

const defaultCameraOptions: ICameraOptions = {
  ratio: "4:3",
  quality: "0.1",
  type: CameraType.back,
  savePhoto: true,
};

const defaultCameraDimensions: ICameraDimensions = {
  width: 0,
  height: 0,
};

const defaultCameraContext: ICameraContext = {
  permission: null,
  cameraDimensions: defaultCameraDimensions,
  cameraRef: null,
  capturedPhoto: null,
  predictions: [],
  cameraOptions: defaultCameraOptions,
  setCameraOptions: (_) => {},
  toggleCameraType: () => {},
  handleTakePicture: () => {},
  setCameraRef: (_) => {},
  resetCamera: () => {},
};

const CameraContext = createContext<ICameraContext>(defaultCameraContext);

const CameraProvider = ({ children }: IProps) => {
  // Camera related
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [cameraDimensions, setCameraDimensions] = useState<ICameraDimensions>(
    defaultCameraDimensions
  );
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const [cameraOptions, setCameraOptions] =
    useState<ICameraOptions>(defaultCameraOptions);
  const { width } = useWindowDimensions();

  const ErrorCon = useContext(ErrorContext);
  const LoadingCon = useContext(LoadingContext);
  const AuthFetchCon = useContext(AuthFetchContext);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const calculateCameraDimensions = () => {
      const height = calculateHeightFromWidth(cameraOptions.ratio, width);
      setCameraDimensions((prev) => {
        return { ...prev, width: width, height: height };
      });
    };

    calculateCameraDimensions();
  }, [cameraOptions.ratio]);

  const toggleCameraType = () => {
    setCameraOptions((prev) => {
      return {
        ...prev,
        type:
          prev.type === CameraType.back ? CameraType.front : CameraType.back,
      };
    });
  };

  const takePicture = async () => {
    if (capturedPhoto !== null) {
      resetCamera();
      return;
    }
    if (!cameraRef) {
      ErrorCon.displayError();
      return;
    }

    await cameraRef
      .takePictureAsync({
        quality: Number(cameraOptions.quality),
        base64: true,
        skipProcessing: true,
      })
      .then(async (photo) => {
        await cameraRef.pausePreview();

        // If camera is front we have to flip
        if (cameraOptions.type === CameraType.front) {
          photo = await manipulateAsync(
            photo.uri,
            [{ rotate: 180 }, { flip: FlipType.Vertical }],
            { compress: 1, format: SaveFormat.PNG, base64: true }
          );
        }

        await AuthFetchCon.authFetch
          .post(config.paths.object_detection + "/capturePhoto", {
            file: photo.base64,
            doSave: cameraOptions.savePhoto,
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
        permission,
        cameraDimensions,
        cameraRef,
        capturedPhoto,
        predictions,
        cameraOptions,
        setCameraOptions,
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
