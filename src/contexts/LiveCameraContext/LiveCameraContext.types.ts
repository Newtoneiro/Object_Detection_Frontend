import { Tensor3D } from "@tensorflow/tfjs-core";
import {
  ICameraDimensions,
  IPrediction,
} from "../CameraContext/CameraContext.types";

export interface ILiveCameraContext {
  cameraRolling: boolean;
  predictions: IPrediction[];
  liveCameraDimensions: ICameraDimensions;
  prepareLiveCameraPage: () => void;
  switchCameraRolling: () => void;
  handleCameraStream: (tensors: IterableIterator<Tensor3D>) => void;
  modelLoaded: () => boolean;
  cameraReady: () => boolean;
}

export interface ILiveCameraDimensions {
  width: number;
  height: number;
}

export interface IPredictionVariables {
  scaleWidth: number;
  scaleHeight: number;
  flipHorizontal: boolean;
}
