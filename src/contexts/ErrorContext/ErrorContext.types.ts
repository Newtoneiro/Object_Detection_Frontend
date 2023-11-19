/**
 * @file ErrorContext.types.ts
 * @description ErrorContext Typescript Type Definitions.
 */

/**
 * Represents the severity of the error.
 * @type IErrorSeverity
 * @exports IErrorSeverity
 *
 * @property {"none" | "notification" | "error" | "fatal"} severity - The severity of the error.
 */
export type IErrorSeverity = "none" | "notification" | "error" | "fatal";

/**
 * Represents the props for the ErrorContext component.
 * @interface IErrorContext
 * @exports IErrorContext
 *
 * @property {boolean} isVisible - Whether the error popup is visible.
 * @property {string | null} message - The error message.
 * @property {IErrorSeverity} severity - The error severity.
 * @property {(message?: string | null, severity?: IErrorSeverity) => void} displayError - The function to display an error.
 * @property {() => void} hideError - The function to hide the error popup.
 *
 * @see {@link IErrorSeverity} for error severity type.
 */
export interface IErrorContext {
  isVisible: boolean;
  message: string | null;
  severity: IErrorSeverity;
  displayError: (message?: string | null, severity?: IErrorSeverity) => void;
  hideError: () => void;
}
