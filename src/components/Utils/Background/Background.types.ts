/**
 * @file Background.types.ts
 * @description Background Typescript Type Definitions.
 */

import { globalTypes } from "../../../config";

/**
 * Represents the props for the Background component.
 * @interface IBackgroundProps
 * @exports IBackgroundProps
 *
 * @property {null | (() => void)} handlePressFunction - The function to call when the return button is pressed.
 */
export type IBackgroundProps = globalTypes.IProps & {
  handlePressFunction: null | (() => void);
};
