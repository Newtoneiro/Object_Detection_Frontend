/**
 * @file Background.types.ts
 * @description Background Typescript Type Definitions.
 */

import { IProps } from "../../../config";

/**
 * Represents the props for the Background component.
 * @interface IBackgroundProps
 * @exports IBackgroundProps
 *
 * @property {null | (() => void)} handlePressFunction - The function to call when the return button is pressed.
 */
export type IBackgroundProps = IProps & {
  handlePressFunction: null | (() => void);
};
