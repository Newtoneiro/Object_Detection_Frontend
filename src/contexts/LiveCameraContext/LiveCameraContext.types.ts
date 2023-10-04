import { Tensor3D } from "@tensorflow/tfjs-core";
import { IPrediction } from "../CameraContext/CameraContext.types";

export interface ILiveCameraContext {
  cameraRolling: boolean;
  tfLoaded: boolean;
  liveCameraOptions: ILiveCameraOptions;
  predictions: IPrediction[];
  loadModel: () => void;
  switchCameraRolling: () => void;
  handleCameraStream: (tensors: IterableIterator<Tensor3D>) => void;
  cameraReady: () => boolean;
}

export interface ILiveCameraOptions {
  frameRate: number;
  resizeWidth: number;
  resizeHeight: number;
  resizeDepth: number;
}
