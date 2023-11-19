/**
 * @file ErrorContext.tsx
 * @description ErrorContext component.
 */
import { IErrorSeverity, IErrorContext } from "./ErrorContext.types";
import { createContext, useState } from "react";

import { IProps } from "../../config";
const defaultErrorMessage = "Something went terribly wrong! Please try again.";

const defaultSeverity: IErrorSeverity = "none";

const defaultErrorContext: IErrorContext = {
  isVisible: false,
  severity: defaultSeverity,
  message: defaultErrorMessage,
  displayError: (_, __) => {},
  hideError: () => {},
};

/**
 * @object
 *
 * Error context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for handling
 * errors in the application.
 *
 * @example
 * import { ErrorContext } from "../contexts/ErrorContext/ErrorContext";
 *
 * const CameraPage = () => {
 *  const ErrorCon = useContext(ErrorContext);
 *
 *  ErrorCon.displayError("Something went terribly wrong!", "error");
 *  return (...)
 * };
 *
 * @see {@link IErrorContext} for more information on the context object
 */
const ErrorContext = createContext<IErrorContext>(defaultErrorContext);

/**
 * @component
 *
 * Error provider component.
 *
 * @description
 *
 * This component provides the {@link ErrorContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { ErrorProvider } from './ErrorProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <ErrorProvider>
 *      <SomeOtherComponent />
 *    </ErrorProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link ErrorContext} for the context object.
 */
const ErrorProvider = ({ children }: IProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [severity, setSeverity] = useState<IErrorSeverity>(defaultSeverity);
  const [message, setMessage] = useState<string | null>(null);

  const displayError = (
    message: string | null = defaultErrorMessage,
    severity: IErrorSeverity = "error"
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
