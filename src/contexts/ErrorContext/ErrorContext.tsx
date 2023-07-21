import { ErrorSeverity, IErrorContext } from "./ErrorContext.types";
import { createContext, useState } from "react";

import { IProps } from "../../config.types";

const defaultErrorMessage = "Something went terribly wrong! Please try again.";

const defaultSeverity: ErrorSeverity = "none";

const defaultErrorContext: IErrorContext = {
  isVisible: false,
  severity: defaultSeverity,
  message: defaultErrorMessage,
  displayError: (_, __) => {},
  hideError: () => {},
};

const ErrorContext = createContext<IErrorContext>(defaultErrorContext);

const ErrorProvider = ({ children }: IProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [severity, setSeverity] = useState<ErrorSeverity>(defaultSeverity);
  const [message, setMessage] = useState<string | null>(null);

  const displayError = (
    message: string | null = defaultErrorMessage,
    severity: ErrorSeverity = "error"
  ) => {
    setMessage(message);
    setSeverity(severity);
    setIsVisible(true);
  };

  const hideError = () => {
    setIsVisible(false);
    setMessage(null);
    setSeverity(defaultSeverity);
  };

  return (
    <ErrorContext.Provider
      value={{ isVisible, severity, message, displayError, hideError }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider };
