import { Camera, CameraType } from "expo-camera";
import {
  ICameraContext,
  ICameraDimensions,
  IPrediction,
  IPredictionResponse,
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
  const { width } = useWindowDimensions();

  useEffect(() => {
    requestPermission();
    calculateCameraDimensions();
  }, []);

  const calculateHeightFromWidth = (ratio: Ratio, width: number): number => {
    let height = 0;
    switch (ratio) {
      case "4:3":
        height = (4 / 3) * width;
        break;
      case "16:9":
        height = (16 / 9) * width;
        break;
      default:
        height = 0;
        break;
    }

    return height;
  };

  const calculateCameraDimensions = () => {
    const height = calculateHeightFromWidth(cameraDimensions.ratio, width);
    setCameraDimensions((prev) => {
      return { ...prev, width: width, height: height };
    });
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const capturePhoto = async () => {
    setLoading(true);
    try {
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
            await test.forEach((element: IPredictionResponse) => {
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
            setPredictions(new_predictions);
            setLoading(false);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const resetCamera = () => {
    setLoading(true);
    setCapturedPhoto(null);
    setPredictions([]);
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
