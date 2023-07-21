export interface IForgotPasswordContext {
  email: string;
  response: IResetPasswordResponse;
  setEmail: (text: string) => void;
  handleSubmitData: () => void;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}
