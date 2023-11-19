/**
 * @file PermissionsContext.types.ts
 * @description PermissionsContext Typescript Type Definitions.
 */

/**
 * Represents the props for the PermissionsContext component.
 * @interface IPermissionsContext
 * @exports IPermissionsContext
 *
 * @property {boolean} cameraPermission - Whether the camera permission is granted.
 * @property {boolean} locationPermission - Whether the location permission is granted.
 * @property {() => void} handleRequestCameraPermission - The function to request the camera permission.
 * @property {() => void} handleRequestLocationPermission - The function to request the location permission.
 */
export interface IPermissionsContext {
  cameraPermission: boolean;
  locationPermission: boolean;
  handleRequestCameraPermission: () => void;
  handleRequestLocationPermission: () => void;
}
