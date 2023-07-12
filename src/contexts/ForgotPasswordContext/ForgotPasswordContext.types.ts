export interface IForgotPasswordContext {
  email: string;
  loading: boolean;
  response: IResetPasswordResponse;
  setEmail: (text: string) => void;
  handleSubmitData: () => void;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}
