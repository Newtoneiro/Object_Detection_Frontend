import { Camera } from "expo-camera";

export interface ICameraContext {
  cameraDimensions: ICameraDimensions;
  cameraRef: Camera | null;
  capturedPhoto: string | null;
  predictions: IPrediction[];
  toggleCameraType: () => void;
  handleTakePicture: () => void;
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
  distance?: number | null;
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
