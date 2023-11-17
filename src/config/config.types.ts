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
 * Represents the list of possible Ratio values.
 */
export const possibleRatios = ["4:3", "16:9"];
/**
 * Represents the camera Ratio.
 * @typedef Ratio
 * @exports Ratio
 *
 * @type {typeof possibleRatios[number]}
 */
export type Ratio = (typeof possibleRatios)[number];

/**
 * Represents the list of possible Quality values.
 */
export const possibleQualities = ["0.1", "0.5", "0.7", "1.0"];
/**
 * Represents the camera photo / video Quality.
 * @typedef Quality
 * @exports Quality
 *
 * @type {typeof possibleQualities[number]}
 */
export type Quality = (typeof possibleQualities)[number];

/**
 * Represents the list of possible FrameRate values.
 */
export const possibleFrameRates = ["1", "2", "5", "10", "20", "30"];
/**
 * Represents the live camera FrameRate (for object detection).
 * @typedef FrameRate
 * @exports FrameRate
 *
 * @type {typeof possibleFrameRates[number]}
 */
export type FrameRate = (typeof possibleFrameRates)[number];
