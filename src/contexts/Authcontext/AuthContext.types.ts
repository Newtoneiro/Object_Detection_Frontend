export interface IAuthState {
  expiresAt: string | null;
  userInfo: {};
}

export interface IAuthContext {
  authState: IAuthState;
  setAuthInfo: (authState: IAuthState) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
}
