/**
 * @file CameraButton.types.ts
 * @description CameraButton Typescript Type Definitions.
 */

/**
 * Represents the props for the CameraButton component.
 * @interface ICameraButtonProps
 * @exports ICameraButtonProps
 *
 * @property {boolean} toggle - Whether the button should be toggleable.
 * @property {() => void} handlePress - The function to call when the button is pressed.
 */
export interface ICameraButtonProps {
  toggle?: boolean;
  handlePress: () => void;
}
