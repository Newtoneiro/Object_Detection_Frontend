/**
 * @file DetectedRectangle.types.ts
 * @description DetectedRectangle Typescript Type Definitions.
 */

import { IPrediction } from "../../../contexts/CameraContext/CameraContext.types";

/**
 * Represents the props for the DetectedRectangle component.
 * @interface IDetectedRectangleProps
 * @exports IDetectedRectangleProps
 *
 * @property {IPrediction} prediction - The prediction to display.
 * @property {boolean} showDynamicDistance - Whether to show the distance calculated dynamically.
 */
export interface IDetectedRectangleProps {
  prediction: IPrediction;
  showDynamicDistance?: boolean;
}
