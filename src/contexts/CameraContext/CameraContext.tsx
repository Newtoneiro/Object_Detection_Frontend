import { Camera, CameraType } from "expo-camera";
import {
  ICameraContext,
  ICameraDimensions,
  Ratio,
} from "./CameraContext.types";
import { createContext, useEffect, useState } from "react";

import { IProps } from "../../config.types";
import { useWindowDimensions } from "react-native";

const defaultCameraDimensions: ICameraDimensions = {
  width: 0,
  height: 0,
  ratio: "16:9",
};

const defaultCameraContext: ICameraContext = {
  type: CameraType.back,
  permission: null,
  cameraDimensions: defaultCameraDimensions,
  toggleCameraType: () => {},
};

const CameraContext = createContext<ICameraContext>(defaultCameraContext);

const CameraProvider = ({ children }: IProps) => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [cameraDimensions, setCameraDimensions] = useState<ICameraDimensions>(
    defaultCameraDimensions
  );
  const [permission, requestPermission] = Camera.useCameraPermissions();
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

  return (
    <CameraContext.Provider
      value={{ type, permission, cameraDimensions, toggleCameraType }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export { CameraContext, CameraProvider };
