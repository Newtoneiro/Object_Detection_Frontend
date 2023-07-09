export interface IUserInfo {
  email: string | null;
  uid: string | null;
}

export interface IAuthState {
  expiresAt: string | null;
  userInfo: IUserInfo | {};
}

export interface IAuthResponse {
  success: boolean;
  message: string;
}

export interface IAuthContext {
  authState: IAuthState;
  setAuthInfo: (authState: IAuthState) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
  register: (user: IRegisterData) => Promise<IAuthResponse> | null;
  login: (user: IRegisterData) => Promise<IAuthResponse> | null;
  loginGoogle: () => Promise<IAuthResponse> | null;
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
