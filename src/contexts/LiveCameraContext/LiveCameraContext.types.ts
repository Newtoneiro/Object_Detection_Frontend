import { Tensor3D } from "@tensorflow/tfjs-core";

export interface ILiveCameraContext {
  cameraRolling: boolean;
  tfLoaded: boolean;
  liveCameraOptions: ILiveCameraOptions;
  switchCameraRolling: () => void;
  openLiveConnection: () => void;
  closeLiveConnection: () => void;
  handleCameraStream: (tensors: IterableIterator<Tensor3D>) => void;
}

export interface ILiveCameraOptions {
  frameRate: number;
  resizeWidth: number;
  resizeHeight: number;
  resizeDepth: number;
}
