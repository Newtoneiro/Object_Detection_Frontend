import { Camera, CameraType } from "expo-camera";
import {
  ICameraContext,
  ICameraDimensions,
  ICameraOptions,
  IPrediction,
  IPredictionResponse,
} from "./CameraContext.types";
import { createContext, useContext, useEffect, useState } from "react";

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
  toggleCameraType: () => {},
  handleButtonClick: () => {},
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

    cameraRef
      .takePictureAsync({
        quality: Number(cameraOptions.quality),
        base64: true,
        skipProcessing: true,
      })
      .then(async (photo) => {
        await cameraRef.pausePreview();

        setCapturedPhoto(photo.uri);

        let source = photo.base64;
        const response = await fetch(
          config.api_path + "/objectDetection" + "/capturePhoto",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              file: source,
              doSave: cameraOptions.savePhoto,
            }),
          }
        );
        if (response.status !== 200) {
          throw "Bad request.";
        }
        const response_json = await response.json();

        const new_predictions: IPrediction[] = [];
        await response_json.forEach((element: IPredictionResponse) => {
          new_predictions.push({
            ...element,
            box: {
              x:
                ((element.box.x1 + element.box.x2) / 2) *
                cameraDimensions.width,
              y:
                ((element.box.y1 + element.box.y2) / 2) *
                cameraDimensions.height,
              width: (element.box.x2 - element.box.x1) * cameraDimensions.width,
              height:
                (element.box.y2 - element.box.y1) * cameraDimensions.height,
            },
          });
        });
        setPredictions(new_predictions);
      })
      .catch((error: any) => {
        setCapturedPhoto(null);
        ErrorCon.displayError(
          `Something went terribly wrong. ${error}`,
          "error"
        );
        return;
      });
  };

  const handleButtonClick = () => {
    LoadingCon.setLoading(true);
    takePicture();
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
        toggleCameraType,
        handleButtonClick,
        setCameraRef,
        resetCamera,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export { CameraContext, CameraProvider };
