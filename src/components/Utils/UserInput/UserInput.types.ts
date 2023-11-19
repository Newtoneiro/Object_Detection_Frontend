/**
 * @file UserInput.types.ts
 * @description UserInput Typescript Type Definitions.
 */

/**
 * Represents the props for the UserInput component.
 * @interface IUserInputProps
 * @exports IUserInputProps
 *
 * @property {string} value - The value of the input.
 * @property {(text: string) => void} changeValue - The function to call when the value of the input changes.
 * @property {IUserInputOptions} options - The options for the input.
 */
export interface IUserInputProps {
  value: string;
  changeValue: (text: string) => void;
  options: IUserInputOptions;
}

/**
 * Represents the options for the UserInput component.
 * @interface IUserInputOptions
 * @exports IUserInputOptions
 *
 * @property {boolean} options.isAlert - Whether the input is an alert (changed look).
 * @property {boolean} options.isSecret - Whether the input is a secret (hidden text).
 * @property {string} options.placeholder - The placeholder for the input.
 * @property {"envelope" | "lock" | null} options.icon - The icon to display.
 */
export interface IUserInputOptions {
  isAlert: boolean;
  isSecret: boolean;
  placeholder: string;
  icon: "envelope" | "lock" | null;
}
