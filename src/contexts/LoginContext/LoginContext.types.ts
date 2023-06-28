export interface ILoginContext {
  userInputs: IUserInputs;
  isLoginMode: Boolean;
  switchLoginMode: () => void;
  setEmail: (string) => void;
  setPassword: (string) => void;
  setConfirmPassword: (string) => void;
}

export interface IUserInputs {
  email: string;
  password: string;
  confirmPassword: string;
}
