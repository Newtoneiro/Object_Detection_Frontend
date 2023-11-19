/**
 * @file LiveCameraContext.types.ts
 * @description LiveCameraContext Typescript Type Definitions.
 */
import { Tensor3D } from "@tensorflow/tfjs-core";
import { ICameraDimensions, IPrediction } from "../../config";

/**
 * Represents the props for the LiveCameraContext component.
 * @interface IProps
 * @exports IProps
 *
 * @property {boolean} cameraRolling - Whether the camera is rolling.
 * @property {IPrediction[]} predictions - The predictions.
 * @property {ICameraDimensions} liveCameraDimensions - The live camera dimensions.
 * @property {() => void} prepareLiveCameraPage - The function to prepare the live camera page.
 * @property {() => void} switchCameraRolling - The function to switch the camera rolling.
 * @property {(tensors: IterableIterator<Tensor3D>) => void} handleCameraStream - The function to handle the camera stream.
 * @property {() => boolean} modelLoaded - The function to check whether the model is loaded.
 * @property {() => boolean} cameraReady - The function to check whether the camera is ready.
 *
 * @see {@link IPrediction} for the prediction type.
 * @see {@link ICameraDimensions} for the camera dimensions type.
 */
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

/**
 * Represents the prediction variables used to post process the predictions,
 * to be able to display them on the screen.
 * @interface IPredictionVariables
 * @exports IPredictionVariables
 *
 * @property {number} scaleWidth - The image width scale.
 * @property {number} scaleHeight - The image height scale.
 * @property {boolean} flipHorizontal - Whether the image is flipped horizontally (depending on the OS).
 */
export interface IPredictionVariables {
  scaleWidth: number;
  scaleHeight: number;
  flipHorizontal: boolean;
}
