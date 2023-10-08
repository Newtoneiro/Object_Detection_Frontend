import { Tensor3D } from "@tensorflow/tfjs-core";
import { CameraType } from "expo-camera";
import {
  ICameraDimensions,
  IPrediction,
  Ratio,
} from "../CameraContext/CameraContext.types";

export interface ILiveCameraContext {
  cameraRolling: boolean;
  tfLoaded: boolean;
  liveCameraOptions: ILiveCameraOptions;
  predictions: IPrediction[];
  liveCameraDimensions: ICameraDimensions;
  loadModel: () => void;
  switchCameraRolling: () => void;
  handleCameraStream: (tensors: IterableIterator<Tensor3D>) => void;
  cameraReady: () => boolean;
  setLiveCameraOptions: (_: ILiveCameraOptions) => void;
}

export interface ILiveCameraOptions {
  type: CameraType;
  ratio: Ratio;
  frameRate: FrameRate;
  resizeWidth: number;
  resizeHeight: number;
  resizeDepth: number;
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

export const possibleFrameRates = ["1", "2", "5", "10", "20", "30"];
export type FrameRate = (typeof possibleFrameRates)[number];

export const RESIZE_WIDTH = 152;
export const RESIZE_HEIGHT = 200;
