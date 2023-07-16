import { Camera, CameraType, PermissionResponse } from "expo-camera";

export interface ICameraContext {
  type: CameraType;
  permission: PermissionResponse | null;
  cameraDimensions: ICameraDimensions;
  cameraRef: Camera | null;
  toggleCameraType: () => void;
  capturePhoto: () => void;
  setCameraRef: (_: Camera | null) => void;
}

export interface ICameraDimensions {
  width: number;
  height: number;
  ratio: Ratio;
}

export type Ratio = "4:3" | "16:9";
