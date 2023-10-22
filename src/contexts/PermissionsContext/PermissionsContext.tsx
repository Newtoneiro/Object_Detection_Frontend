import { createContext, useContext, useEffect } from "react";
import { IProps } from "../../config.types";
import { IPermissionsContext } from "./PermissionsContext.types";
import { Camera } from "expo-camera";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import { useForegroundPermissions } from "expo-location";

const defaultPermissionsContext: IPermissionsContext = {
  cameraPermission: false,
  locationPermission: false,
  handleRequestCameraPermission: () => {},
  handleRequestLocationPermission: () => {},
};

const PermissionsContext = createContext<IPermissionsContext>(
  defaultPermissionsContext
);

const PermissionsProvider = ({ children }: IProps) => {
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [locationPermisson, requestLocationPermission] =
    useForegroundPermissions();

  const ErrorCon = useContext(ErrorContext);

  useEffect(() => {
    handleRequestCameraPermission();
    handleRequestLocationPermission();
  }, []);

  const handleRequestCameraPermission = async () => {
    const response = await requestCameraPermission();
    if (!response.canAskAgain) {
      ErrorCon.displayError(
        "Can not ask for camera permissions. Please provide the permission manually."
      );
    }
  };

  const handleRequestLocationPermission = async () => {
    const response = await requestLocationPermission();
    if (!response.canAskAgain) {
      ErrorCon.displayError(
        "Can not ask for location permissions. Please provide the permission manually."
      );
    }
  };

  return (
    <PermissionsContext.Provider
      value={{
        cameraPermission: cameraPermission?.granted || false,
        locationPermission: locationPermisson?.granted || false,
        handleRequestCameraPermission,
        handleRequestLocationPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export { PermissionsContext, PermissionsProvider };
