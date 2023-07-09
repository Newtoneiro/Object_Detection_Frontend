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
}

export interface IUserInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserInputsAlert {
  cause: string | null;
  inputsIssue: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
}
