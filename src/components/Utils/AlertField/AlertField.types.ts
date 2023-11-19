/**
 * @file AlertField.types.ts
 * @description AlertField Typescript Type Definitions.
 */

/**
 * Represents the props for the AlertField component.
 * @interface IAlertFieldProps
 * @exports IAlertFieldProps
 *
 * @property {string} text - The text to display.
 * @property {boolean} success - Whether the alert is a success or not.
 */
export type IAlertFieldProps = {
  text: string;
  success: boolean;
};
