import { Tensor3D } from "@tensorflow/tfjs-core";
import { IPrediction } from "../CameraContext/CameraContext.types";

export interface ILiveCameraContext {
  cameraRolling: boolean;
  tfLoaded: boolean;
  liveCameraOptions: ILiveCameraOptions;
  predictions: IPrediction[];
  switchCameraRolling: () => void;
  handleCameraStream: (tensors: IterableIterator<Tensor3D>) => void;
}

export interface ILiveCameraOptions {
  frameRate: number;
  resizeWidth: number;
  resizeHeight: number;
  resizeDepth: number;
}
