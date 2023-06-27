export interface ILoginContext {
  userInputs: IUserInputs;
  setEmail: (string) => void;
  setPassword: (string) => void;
  setConfirmPassword: (string) => void;
}

export interface IUserInputs {
  email: string;
  password: string;
  confirmPassword: string;
}
