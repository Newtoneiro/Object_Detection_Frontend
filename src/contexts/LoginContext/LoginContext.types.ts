export interface ILoginContext {
  userInputs: IUserInputs;
  isLoginMode: Boolean;
  switchLoginMode: () => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  handleSubmitData: () => void;
}

export interface IUserInputs {
  email: string;
  password: string;
  confirmPassword: string;
}
