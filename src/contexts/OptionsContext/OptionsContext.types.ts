/**
 * @file OptionsContext.types.ts
 * @description OptionsContext Typescript Type Definitions.
 */
import { CameraType } from "expo-camera";

import { globalConfig } from "../../config";
import { FrameRate, Quality, Ratio } from "../../config/config.types";

/**
 * Represents the props for the OptionsContext component.
 * @interface IOptionsContext
 * @exports IOptionsContext
 *
 * @property {ICameraOptions} cameraOptions - The camera options.
 * @property {ILiveCameraOptions} liveCameraOptions - The live camera options.
 * @property {IServerOptions} serverOptions - The server options.
 * @property {(options: ICameraOptions) => void} setCameraOptions - The function to set the camera options.
 * @property {(options: ILiveCameraOptions) => void} setLiveCameraOptions - The function to set the live camera options.
 * @property {(options: IServerOptions) => void} setServerOptions - The function to set the server options.
 *
 * @see {@link ICameraOptions} for the camera options type.
 * @see {@link ILiveCameraOptions} for the live camera options type.
 * @see {@link IServerOptions} for the server options type.
 */
export interface IOptionsContext {
  cameraOptions: ICameraOptions;
  liveCameraOptions: ILiveCameraOptions;
  serverOptions: IServerOptions;
  setCameraOptions: (_: ICameraOptions) => void;
  setLiveCameraOptions: (_: ILiveCameraOptions) => void;
  setServerOptions: (_: IServerOptions) => void;
}

/**
 * Represents the camera options.
 * @interface ICameraOptions
 * @exports ICameraOptions
 *
 * @property {CameraType} type - The camera type (front / back).
 * @property {Ratio} ratio - The camera ratio.
 * @property {Quality} quality - The camera quality.
 *
 * @see {@link CameraType} for the camera type.
 * @see {@link Ratio} for the camera ratio.
 * @see {@link Quality} for the camera quality.
 */
export interface ICameraOptions {
  type: CameraType;
  ratio: Ratio;
  quality: Quality;
}

/**
 * Represents the live camera options.
 * @interface ILiveCameraOptions
 * @exports ILiveCameraOptions
 *
 * @property {CameraType} type - The camera type (front / back).
 * @property {Ratio} ratio - The camera ratio.
 * @property {FrameRate} frameRate - The camera frame rate.
 * @property {number} resizeWidth - The width to resize the image to.
 * @property {number} resizeHeight - The height to resize the image to.
 * @property {number} resizeDepth - The depth to resize the image to.
 * @property {boolean} showDynamicDistance - Whether to show the dynamic distance.
 *
 * @see {@link CameraType} for the camera type.
 * @see {@link Ratio} for the camera ratio.
 * @see {@link FrameRate} for the camera frame rate.
 */
export interface ILiveCameraOptions {
  type: CameraType;
  ratio: Ratio;
  frameRate: FrameRate;
  resizeWidth: number;
  resizeHeight: number;
  resizeDepth: number;
  showDynamicDistance: boolean;
}

/**
 * Represents the server options.
 * @interface IServerOptions
 * @exports IServerOptions
 *
 * @property {boolean} savePhoto - Whether to save the photo on the server.
 */
export interface IServerOptions {
  savePhoto: boolean;
}

/**
 * Represents the default camera options.
 * @constant defaultCameraOptions
 * @exports defaultCameraOptions
 *
 * @property {Ratio} ratio - The camera ratio.
 * @property {Quality} quality - The camera quality.
 * @property {CameraType} type - The camera type (front / back).
 */
export const defaultCameraOptions: ICameraOptions = {
  ratio: "4:3",
  quality: "0.1",
  type: CameraType.back,
};

/**
 * Represents the default live camera options.
 * @constant defaultLiveCameraOptions
 * @exports defaultLiveCameraOptions
 *
 * @property {Ratio} ratio - The camera ratio.
 * @property {FrameRate} frameRate - The camera frame rate.
 * @property {number} resizeWidth - The width to resize the image to.
 * @property {number} resizeHeight - The height to resize the image to.
 * @property {number} resizeDepth - The depth to resize the image to.
 * @property {boolean} showDynamicDistance - Whether to show the dynamic distance.
 */
export const defaultLiveCameraOptions: ILiveCameraOptions = {
  type: CameraType.back,
  ratio: "4:3",
  frameRate: "20",
  resizeWidth: globalConfig.live_camera.RESIZE_WIDTH,
  resizeHeight: globalConfig.live_camera.RESIZE_HEIGHT,
  resizeDepth: globalConfig.live_camera.RESIZE_DEPTH,
  showDynamicDistance: true,
};

/**
 * Represents the default server options.
 * @constant defaultServerOptions
 * @exports defaultServerOptions
 *
 * @property {boolean} savePhoto - Whether to save the photo on the server.
 */
export const defaultServerOptions: IServerOptions = {
  savePhoto: true,
};
