/**
 * @file PermissionsContext.tsx
 * @description PermissionsContext component.
 */
import { Camera } from "expo-camera";
import { useForegroundPermissions } from "expo-location";
import { createContext, useContext, useEffect } from "react";
import { IProps } from "../../config";
import { ErrorContext } from "../ErrorContext";
import { IPermissionsContext } from "./PermissionsContext.types";

const defaultPermissionsContext: IPermissionsContext = {
  cameraPermission: false,
  locationPermission: false,
  handleRequestCameraPermission: () => {},
  handleRequestLocationPermission: () => {},
};

/**
 * @object
 *
 * Permissions context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for handling
 * options functionality in the whole application.
 *
 * @example
 * import { PermissionsContext } from "../contexts/PermissionsContext/PermissionsContext";
 *
 * const CameraPage = () => {
 *  const PermissionsCon = useContext(PermissionsContext);
 *
 *  PermissionsContext.requestCameraPermission();
 *  return (...)
 * };
 *
 * @see {@link IPermissionsContext} for more information on the context object
 */
const PermissionsContext = createContext<IPermissionsContext>(
  defaultPermissionsContext
);

/**
 * @component
 *
 * Permissions provider component.
 *
 * @description
 *
 * This component provides the {@link PermissionsContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { PermissionsProvider } from './PermissionsProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <PermissionsProvider>
 *      <SomeOtherComponent />
 *    </PermissionsProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link PermissionsContext} for the context object.
 */
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
