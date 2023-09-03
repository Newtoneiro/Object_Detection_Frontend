export interface IUserInfo {
  email: string | null;
  name: string | null;
  uid: string | null;
  picture: string | null;
  isAnonymous: boolean;
  isByGoogleAuth: boolean;
}

export interface IAuthState {
  token: string | null;
  userInfo: IUserInfo | null;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
}

export interface IAuthContext {
  authState: IAuthState;
  isAuthenticated: boolean | null;
  setAuthInfo: (authState: IAuthState) => void;
  logout: () => void;
  register: (user: IRegisterData) => Promise<IAuthResponse> | null;
  login: (user: IRegisterData) => Promise<IAuthResponse> | null;
  loginGoogle: () => Promise<IAuthResponse> | null;
  loginAnonymous: () => Promise<IAuthResponse> | null;
  resetPassword: (email: string) => Promise<IAuthResponse> | null;
}

export interface IRegisterData {
  email: string;
  password: string;
}

export interface IFirebaseError {
  code: string;
  message: string;
  name: string;
}
