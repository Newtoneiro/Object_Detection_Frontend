import { Camera, CameraType, PermissionResponse } from "expo-camera";

export interface ICameraContext {
  permission: PermissionResponse | null;
  cameraDimensions: ICameraDimensions;
  cameraRef: Camera | null;
  capturedPhoto: string | null;
  predictions: IPrediction[];
  cameraOptions: ICameraOptions;
  toggleCameraType: () => void;
  handleButtonClick: () => void;
  setCameraRef: (_: Camera | null) => void;
  resetCamera: () => void;
}

export interface ICameraDimensions {
  width: number;
  height: number;
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

export interface ICameraOptions {
  type: CameraType;
  ratio: Ratio;
  quality: Quality;
  savePhoto: boolean;
}

export type Ratio = "4:3" | "16:9";

export type Quality = "0.1" | "0.5" | "0.7" | "1.0";
