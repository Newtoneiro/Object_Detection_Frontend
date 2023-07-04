export interface IUserInfo {
  email: string | null;
  uid: string | null;
}

export interface IAuthState {
  expiresAt: string | null;
  userInfo: IUserInfo;
}

export interface IAuthContext {
  authState: IAuthState;
  setAuthInfo: (authState: IAuthState) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
  register: (user: IRegisterData) => void;
}

export interface IRegisterData {
  email: string;
  password: string;
}
