import { CameraType } from "expo-camera";

import config from "../../config";
import { FrameRate, Quality, Ratio } from "../../config.types";

export interface IOptionsContext {
  cameraOptions: ICameraOptions;
  liveCameraOptions: ILiveCameraOptions;
  serverOptions: IServerOptions;
  setCameraOptions: (_: ICameraOptions) => void;
  setLiveCameraOptions: (_: ILiveCameraOptions) => void;
  setServerOptions: (_: IServerOptions) => void;
}

export interface ICameraOptions {
  type: CameraType;
  ratio: Ratio;
  quality: Quality;
}

export interface ILiveCameraOptions {
  type: CameraType;
  ratio: Ratio;
  frameRate: FrameRate;
  resizeWidth: number;
  resizeHeight: number;
  resizeDepth: number;
  showDynamicDistance: boolean;
}

export interface IServerOptions {
  savePhoto: boolean;
}

export const defaultCameraOptions: ICameraOptions = {
  ratio: "4:3",
  quality: "0.1",
  type: CameraType.back,
};

export const defaultLiveCameraOptions: ILiveCameraOptions = {
  type: CameraType.back,
  ratio: "4:3",
  frameRate: "20",
  resizeWidth: config.live_camera.RESIZE_WIDTH,
  resizeHeight: config.live_camera.RESIZE_HEIGHT,
  resizeDepth: config.live_camera.RESIZE_DEPTH,
  showDynamicDistance: true,
};

export const defaultServerOptions: IServerOptions = {
  savePhoto: true,
};
