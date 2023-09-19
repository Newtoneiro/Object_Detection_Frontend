import { Tensor3D } from "@tensorflow/tfjs-core";

export interface ILiveCameraContext {
  tfLoaded: boolean;
  liveCameraOptions: ILiveCameraOptions;
  openLiveConnection: () => void;
  closeLiveConnection: () => void;
  handleCameraStream: (tensors: IterableIterator<Tensor3D>) => void;
}

export interface ILiveCameraOptions {
  resizeWidth: number;
  resizeHeight: number;
  resizeDepth: number;
}
