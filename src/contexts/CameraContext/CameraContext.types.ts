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
  name: string;
  class: number;
  confidence: number;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface IPredictionResponse {
  name: string;
  class: number;
  confidence: number;
  box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export type Ratio = "4:3" | "16:9";
