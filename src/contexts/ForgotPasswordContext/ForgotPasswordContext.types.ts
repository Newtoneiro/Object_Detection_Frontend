/**
 * @file ForgotPasswordContext.types.ts
 * @description ForgotPasswordContext Typescript Type Definitions.
 */

/**
 * Represents the props for the ForgotPasswordContext component.
 * @interface IProps
 * @exports IProps
 *
 * @property {string} email - The email for which the forgot password process is executed.
 * @property {IResetPasswordResponse} response - The response from the server.
 * @property {(text: string) => void} setEmail - The function to set the email address.
 * @property {() => void} handleSubmitData - The function to submit the email address and start the password recovery process.
 *
 * @see {@link IResetPasswordResponse} for the response type.
 */
export interface IForgotPasswordContext {
  email: string;
  response: IResetPasswordResponse;
  setEmail: (text: string) => void;
  handleSubmitData: () => void;
}

/**
 * Represents the response from the server.
 * @interface IResetPasswordResponse
 * @exports IResetPasswordResponse
 *
 * @property {boolean} success - Whether the password reset was successful.
 * @property {string} message - The message from the server.
 *
 * @see {@link IForgotPasswordContext} for the context type.
 */
export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}
