export interface IPermissionsContext {
  cameraPermission: boolean;
  locationPermission: boolean;
  handleRequestCameraPermission: () => void;
  handleRequestLocationPermission: () => void;
}
