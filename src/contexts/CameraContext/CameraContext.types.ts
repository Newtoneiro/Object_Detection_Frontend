import { Camera, CameraType, PermissionResponse } from "expo-camera";

export interface ICameraContext {
  type: CameraType;
  permission: PermissionResponse | null;
  cameraDimensions: ICameraDimensions;
  cameraRef: Camera | null;
  capturedPhoto: string | null;
  loading: boolean;
  predictions: IPrediction[];
  toggleCameraType: () => void;
  capturePhoto: () => void;
  setCameraRef: (_: Camera | null) => void;
  resetCamera: () => void;
}

export interface ICameraDimensions {
  width: number;
  height: number;
  ratio: Ratio;
}

export interface IPrediction {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Ratio = "4:3" | "16:9";
