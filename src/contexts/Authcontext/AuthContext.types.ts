/**
 * @file AuthContext.types.ts
 * @description AuthContext Typescript Type Definitions.
 */

/**
 * Represents the user info.
 * @interface IUserInfo
 * @exports IUserInfo
 *
 * @property {string | null} email - The user email.
 * @property {string | null} name - The user name.
 * @property {string | null} uid - The user uid.
 * @property {string | null} picture - The user picture.
 * @property {boolean} isAnonymous - The flag indicating if the user is anonymous.
 * @property {boolean} isByGoogleAuth - The flag indicating if the user is authenticated by Google.
 */
export interface IUserInfo {
  email: string | null;
  name: string | null;
  uid: string | null;
  picture: string | null;
  isAnonymous: boolean;
  isByGoogleAuth: boolean;
}

/**
 * Represents the auth state.
 * @interface IAuthState
 * @exports IAuthState
 *
 * @property {string | null} token - The auth token.
 * @property {IUserInfo | null} userInfo - The user info.
 *
 * @see {@link IUserInfo} for userInfo interface.
 */
export interface IAuthState {
  token: string | null;
  userInfo: IUserInfo | null;
}

/**
 * Represents the auth response returned by requests to firebase auth.
 * @interface IAuthResponse
 * @exports IAuthResponse
 *
 * @property {boolean} success - The flag indicating if the request was successful.
 * @property {string} message - The message returned by the request.
 *
 * @see https://firebase.google.com/docs for the firebase functions
 */
export interface IAuthResponse {
  success: boolean;
  message: string;
}

/**
 * Represents the props for the AuthContext component.
 * @interface IAuthContext
 * @exports IAuthContext
 *
 * @property {IAuthState} authState - The authState to display.
 * @property {boolean | null} isAuthenticated - The isAuthenticated flag indicating if the user is authenticated (null if the info is being loaded).
 * @property {(authState: IAuthState) => void} setAuthInfo - The function to set the auth info.
 * @property {() => void} logout - The function to logout the user.
 * @property {(user: IRegisterData) => Promise<IAuthResponse> | null} register - The function to register the user.
 * @property {(user: IRegisterData) => Promise<IAuthResponse> | null} login - The function to login the user using email and password.
 * @property {() => Promise<IAuthResponse> | null} loginGoogle - The function to login the user using Google.
 * @property {() => Promise<IAuthResponse> | null} loginAnonymous - The function to login the user anonymously.
 * @property {(email: string) => Promise<IAuthResponse> | null} resetPassword - The function to start the password reset process.
 *
 * @see {@link IAuthState} for authState interface.
 * @see https://firebase.google.com/docs for the firebase functions
 */
export interface IAuthContext {
  authState: IAuthState;
  isAuthenticated: boolean | null;
  setAuthInfo: (authState: IAuthState) => void;
  logout: () => void;
  register: (user: IUserInputData) => Promise<IAuthResponse> | null;
  login: (user: IUserInputData) => Promise<IAuthResponse> | null;
  loginGoogle: () => Promise<IAuthResponse> | null;
  loginAnonymous: () => Promise<IAuthResponse> | null;
  resetPassword: (email: string) => Promise<IAuthResponse> | null;
}

/**
 * Represents the data given by user in login / register form.
 * @interface IUserInputData
 * @exports IUserInputData
 *
 * @property {string} email - The user email.
 * @property {string} password - The user password.
 */
export interface IUserInputData {
  email: string;
  password: string;
}

/**
 * Represents the Error returned by requests to firebase auth.
 * @interface IFirebaseError
 * @exports IFirebaseError
 *
 * @property {string} code - The error code.
 * @property {string} message - The error message.
 * @property {string} name - The error name.
 *
 * @see https://firebase.google.com/docs for the firebase functions
 *
 */
export interface IFirebaseError {
  code: string;
  message: string;
  name: string;
}
