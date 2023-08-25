export type ErrorSeverity = "none" | "notification" | "error" | "fatal";

export interface IErrorContext {
  isVisible: boolean;
  message: string | null;
  severity: ErrorSeverity;
  displayError: (message?: string | null, severity?: ErrorSeverity) => void;
  hideError: () => void;
}
