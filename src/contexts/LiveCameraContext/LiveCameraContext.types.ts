export interface ILiveCameraContext {
  openLiveConnection: () => void;
  closeLiveConnection: () => void;
  streamCameraOutput: () => void;
}
