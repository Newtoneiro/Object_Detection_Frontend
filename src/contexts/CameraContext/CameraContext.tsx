import { Camera, CameraType } from "expo-camera";
import {
  ICameraContext,
  ICameraDimensions,
  IPrediction,
  Ratio,
} from "./CameraContext.types";
import { createContext, useEffect, useState } from "react";

import { IProps } from "../../config.types";
import config from "../../config";
import { useWindowDimensions } from "react-native";

const defaultCameraDimensions: ICameraDimensions = {
  width: 0,
  height: 0,
  ratio: "4:3",
};

const defaultCameraContext: ICameraContext = {
  type: CameraType.back,
  permission: null,
  cameraDimensions: defaultCameraDimensions,
  cameraRef: null,
  capturedPhoto: null,
  loading: true,
  predictions: [],
  toggleCameraType: () => {},
  capturePhoto: () => {},
  setCameraRef: (_) => {},
  resetCamera: () => {},
};

const CameraContext = createContext<ICameraContext>(defaultCameraContext);

const CameraProvider = ({ children }: IProps) => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [cameraDimensions, setCameraDimensions] = useState<ICameraDimensions>(
    defaultCameraDimensions
  );
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const { height } = useWindowDimensions();

  useEffect(() => {
    requestPermission();
    calculateCameraDimensions();
  }, []);

  const calculateWidthFromHeight = (ratio: Ratio, height: number): number => {
    let width = 0;
    switch (ratio) {
      case "4:3":
        width = (3 / 4) * height;
        break;
      case "16:9":
        width = (9 / 16) * height;
        break;
      default:
        width = 0;
        break;
    }

    return width;
  };

  const calculateCameraDimensions = () => {
    const actualWidth = calculateWidthFromHeight(
      cameraDimensions.ratio,
      height
    );
    setCameraDimensions((prev) => {
      return { ...prev, width: actualWidth, height: height };
    });
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const capturePhoto = async () => {
    setLoading(true);
    if (!cameraRef) {
      return;
    }
    cameraRef
      .takePictureAsync({
        quality: 0.7,
        base64: true,
        skipProcessing: true,
      })
      .then(async (photo) => {
        await cameraRef.pausePreview();
        setCapturedPhoto(photo.uri);
        let source = photo.base64;

        if (!source) {
          return;
        }

        fetch(config.api_path + "/capturePhoto", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({ file: source }),
        }).then(async (response) => {
          const test = await response.json();
          const new_predictions: IPrediction[] = [];
          await test.result_boxes.forEach((element) => {
            new_predictions.push({
              x: Number(element.x),
              y: Number(element.y),
              width: Number(element.w),
              height: Number(element.h),
            });
          });
          setPredictions(new_predictions);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const resetCamera = () => {
    setLoading(true);
    setCapturedPhoto(null);
    setLoading(false);
  };

  return (
    <CameraContext.Provider
      value={{
        type,
        permission,
        cameraDimensions,
        cameraRef,
        capturedPhoto,
        loading,
        predictions,
        toggleCameraType,
        capturePhoto,
        setCameraRef,
        resetCamera,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export { CameraContext, CameraProvider };
