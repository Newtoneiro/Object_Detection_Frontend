/**
 * @file config.types.ts
 * @description config Typescript Type Definitions.
 */
import { ReactElement, ReactNode } from "react";

/**
 * Represents the props for the config component.
 * @interface IProps
 * @exports IProps
 *
 * @property {string | JSX.Element | JSX.Element[] | ReactElement | "() => JSX.Element" | ReactNode} children - The children to display.
 */
export interface IProps {
  children:
    | string
    | JSX.Element
    | JSX.Element[]
    | ReactElement
    | "() => JSX.Element"
    | ReactNode;
}

/**
 * Represents the camera dimensions.
 * @interface ICameraDimensions
 * @exports ICameraDimensions
 *
 * @property {number} width - The camera width.
 * @property {number} height - The camera height.
 */
export interface ICameraDimensions {
  width: number;
  height: number;
}

/**
 * Represents the prediction.
 * @interface IPrediction
 * @exports IPrediction
 *
 * @property {string} name - The predicted object's name.
 * @property {number} class - The predicted object's class.
 * @property {number} confidence - The predicted object's confidence.
 * @property {{x: number, y: number, width: number, height: number}} box - The predicted object's box.
 * @property {number | null} distance - The predicted object's distance (if given)
 */
export interface IPrediction {
  name: string;
  class: number;
  confidence: number;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  distance?: number | null;
}

/**
 * Represents the list of possible Ratio values.
 * @type {string[]}
 *
 * @property {string} "4:3" - 4:3 ratio.
 * @property {string} "16:9" - 16:9 ratio.
 */
export const possibleRatios = ["4:3", "16:9"];
/**
 * Represents the camera Ratio.
 * @typedef Ratio
 * @exports Ratio
 *
 * @type {typeof possibleRatios[number]}
 * @property {["4:3", "16:9"]} ratio - Selected one from the possible ratio values.
 */
export type Ratio = (typeof possibleRatios)[number];

/**
 * Represents the list of possible Quality values.
 * @type {string[]}
 *
 * @property {string} "0.1" - 0.1 quality.
 * @property {string} "0.5" - 0.5 quality.
 * @property {string} "0.7" - 0.7 quality.
 * @property {string} "1.0" - 1.0 quality.
 */
export const possibleQualities = ["0.1", "0.5", "0.7", "1.0"];
/**
 * Represents the camera photo / video Quality.
 * @typedef Quality
 * @exports Quality
 *
 * @type {typeof possibleQualities[number]}
 * @property {["0.1", "0.5", "0.7", "1.0"]} quality - Selected one from the possible quality values.
 */
export type Quality = (typeof possibleQualities)[number];

/**
 * Represents the list of possible FrameRate values.
 * @type {string[]}
 *
 * @property {string} "1" - 1 frame per second.
 * @property {string} "2" - 2 frames per second.
 * @property {string} "5" - 5 frames per second.
 * @property {string} "10" - 10 frames per second.
 * @property {string} "20" - 20 frames per second.
 * @property {string} "30" - 30 frames per second.
 */
export const possibleFrameRates = ["1", "2", "5", "10", "20", "30"];
/**
 * Represents the live camera FrameRate (for object detection).
 * @typedef FrameRate
 * @exports FrameRate
 *
 * @type {typeof possibleFrameRates[number]}
 * @property {["1", "2", "5", "10", "20", "30"]} frameRate - Selected one from the possible frame rate values.
 */
export type FrameRate = (typeof possibleFrameRates)[number];
