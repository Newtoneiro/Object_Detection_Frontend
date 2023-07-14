import { Camera, CameraType } from "expo-camera";
import { ICameraContext, Ratio } from "./CameraContext.types";
import { createContext, useEffect, useState } from "react";

import { IProps } from "../../config.types";
import { useWindowDimensions } from "react-native";

const defaultCameraContext: ICameraContext = {
  type: CameraType.back,
  permission: null,
  toggleCameraType: () => {},
};

const CameraContext = createContext<ICameraContext>(defaultCameraContext);

const CameraProvider = ({ children }: IProps) => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <CameraContext.Provider value={{ type, permission, toggleCameraType }}>
      {children}
    </CameraContext.Provider>
  );
};

export { CameraContext, CameraProvider };
