export interface ILoginContext {
  userInputs: IUserInputs;
  userInputsAlert: IUserInputsAlert;
  isLoginMode: Boolean;
  loading: Boolean;
  showPasswordsState: IShowPasswordsState;
  switchLoginMode: () => void;
  switchPasswordVisibility: () => void;
  switchConfirmPasswordVisibility: () => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  handleSubmitData: () => void;
  loginGoogle: () => void;
  loginAnonymous: () => void;
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

export interface IShowPasswordsState {
  password: boolean;
  confirmPassword: boolean;
}
