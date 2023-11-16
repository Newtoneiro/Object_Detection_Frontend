export type IErrorSeverity = "none" | "notification" | "error" | "fatal";

export interface IErrorContext {
  isVisible: boolean;
  message: string | null;
  severity: IErrorSeverity;
  displayError: (message?: string | null, severity?: IErrorSeverity) => void;
  hideError: () => void;
}
