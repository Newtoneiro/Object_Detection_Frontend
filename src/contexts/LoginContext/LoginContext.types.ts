/**
 * @file LoginContext.types.ts
 * @description LoginContext Typescript Type Definitions.
 */

/**
 * Represents the props for the LoginContext component.
 * @interface ILoginContext
 * @exports ILoginContext
 *
 * @property {IUserInputs} userInputs - The user inputs (email, password).
 * @property {IUserInputsAlert} userInputsAlert - The user inputs alert (cause, inputsIssue).
 * @property {Boolean} isLoginMode - Whether the login mode is active (switch between login / register).
 * @property {() => void} switchLoginMode - The function to switch the login mode.
 * @property {(text: string) => void} setEmail - The function to set the email address.
 * @property {(text: string) => void} setPassword - The function to set the password.
 * @property {(text: string) => void} setConfirmPassword - The function to set the confirm password.
 * @property {() => void} handleSubmitData - The function to submit the email address and password.
 * @property {() => void} loginGoogle - The function to login with Google.
 * @property {() => void} loginAnonymous - The function to login anonymously.
 *
 * @see {@link IUserInputs} for the user inputs type.
 * @see {@link IUserInputsAlert} for the user inputs alert type.
 * @see {@link https://docs.expo.dev/versions/latest/sdk/google/} for the Google login type.
 * @see {@link https://docs.expo.dev/versions/latest/sdk/auth-session/} for the anonymous login type.
 */
export interface ILoginContext {
  userInputs: IUserInputs;
  userInputsAlert: IUserInputsAlert;
  isLoginMode: Boolean;
  switchLoginMode: () => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  handleSubmitData: () => void;
  loginGoogle: () => void;
  loginAnonymous: () => void;
}

/**
 * Represents the user inputs (email, password).
 * @interface IUserInputs
 * @exports IUserInputs
 *
 * @property {string} email - The email address.
 * @property {string} password - The password.
 * @property {string} confirmPassword - The confirm password.
 */
export interface IUserInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Represents the user inputs alert when there is something
 * wrong with the user's inputs.
 * @interface IUserInputsAlert
 * @exports IUserInputsAlert
 *
 * @property {string} cause - The cause of the alert.
 * @property {Object} inputsIssue - The inputs issue.
 * @property {boolean} inputsIssue.email - Whether the email is wrong.
 * @property {boolean} inputsIssue.password - Whether the password is wrong.
 * @property {boolean} inputsIssue.confirmPassword - Whether the confirm password is wrong.
 */
export interface IUserInputsAlert {
  cause: string;
  inputsIssue: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
}
