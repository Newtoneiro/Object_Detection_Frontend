/**
 * @file GradientButton.types.ts
 * @description GradientButton Typescript Type Definitions.
 */

import { IProps } from "../../../config";

/**
 * Represents the props for the GradientButton component.
 * @interface IGradientButtonProps
 * @exports IGradientButtonProps
 *
 * @property {() => void} handlePressFunction - The function to call when the button is pressed.
 */
export interface IGradientButtonProps extends IProps {
  handlePressFunction: () => void;
}
