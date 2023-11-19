/**
 * @file CameraContext.types.ts
 * @description CameraContext Typescript Type Definitions.
 */

import { Camera } from "expo-camera";
import { ICameraDimensions, IPrediction } from "../../config";

/**
 * Represents the props for the CameraContext component.
 * @interface ICameraContext
 * @exports ICameraContext
 *
 * @property {ICameraDimensions} cameraDimensions - The camera dimensions.
 * @property {Camera | null} cameraRef - The camera reference.
 * @property {string | null} capturedPhoto - The captured photo.
 * @property {IPrediction[]} predictions - The predictions.
 * @property {() => void} toggleCameraType - The function to toggle the camera type (Back / Front).
 * @property {() => void} handleTakePicture - The function to handle taking a picture.
 * @property {(cameraRef: Camera | null) => void} setCameraRef - The function to set the camera reference.
 * @property {() => void} resetCamera - The function to reset the camera.
 *
 * @see {@link ICameraDimensions} for cameraDimensions interface.
 */
export interface ICameraContext {
  cameraDimensions: ICameraDimensions;
  cameraRef: Camera | null;
  capturedPhoto: string | null;
  predictions: IPrediction[];
  toggleCameraType: () => void;
  handleTakePicture: () => void;
  setCameraRef: (_: Camera | null) => void;
  resetCamera: () => void;
}

/**
 * Object representing the prediction returned from the CocoSSD model.
 * @interface IPredictionResponse
 * @exports IPredictionResponse
 *
 * @property {string} name - The predicted object's name.
 * @property {number} class - The predicted object's class.
 * @property {number} confidence - The predicted object's confidence.
 * @property {{x1: number, y1: number, x2: number, y2: number}} box - The predicted object's box.
 */
export interface IPredictionResponse {
  name: string;
  class: number;
  confidence: number;
  box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}
