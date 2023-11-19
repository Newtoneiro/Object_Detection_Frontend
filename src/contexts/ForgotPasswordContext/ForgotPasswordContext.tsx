/**
 * @file ForgotPasswordContext.tsx
 * @description Context for forgot password related functions
 */

import { createContext, useContext, useState } from "react";
import {
  IForgotPasswordContext,
  IResetPasswordResponse,
} from "./ForgotPasswordContext.types";

import { IProps } from "../../config";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import { AuthContext } from "../AuthContext";
import { validateEmail } from "../AuthContext/AuthContext.utils";
import { LoadingContext } from "../LoadingContext";

const defaultResetPasswordResponse: IResetPasswordResponse = {
  success: true,
  message: "",
};

const defaultForgotPasswordContext: IForgotPasswordContext = {
  email: "",
  response: defaultResetPasswordResponse,
  setEmail: (_) => {},
  handleSubmitData: () => {},
};

/**
 * @object
 *
 * Forgot Password context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for handling
 * forgot password functionality. Mainly used in the {@link ForgotPasswordPage} component.
 *
 * @example
 * import { ForgotPasswordContext } from "../contexts/ForgotPasswordContext/ForgotPasswordContext";
 *
 * const CameraPage = () => {
 *  const ForgotPasswordCon = useContext(ForgotPasswordContext);
 *
 *  ForgotPasswordCon.handleSubmitData();
 *  return (...)
 * };
 *
 * @see {@link IForgotPasswordContext} for more information on the context object
 */
const ForgotPasswordContext = createContext<IForgotPasswordContext>(
  defaultForgotPasswordContext
);

/**
 * @component
 *
 * ForgotPassword provider component.
 *
 * @description
 *
 * This component provides the {@link ForgotPasswordContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { ForgotPasswordProvider } from './ForgotPasswordProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <ForgotPasswordProvider>
 *      <SomeOtherComponent />
 *    </ForgotPasswordProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link ForgotPasswordContext} for the context object.
 */
const ForgotPasswordProvider = ({ children }: IProps) => {
  const [email, setEmail] = useState<string>("");
  const [response, setResponse] = useState<IResetPasswordResponse>(
    defaultResetPasswordResponse
  );

  const AuthCon = useContext(AuthContext);
  const LoadingCon = useContext(LoadingContext);

  const handleSubmitData = async () => {
    LoadingCon.setLoading(true);
    if (!validateEmail(email)) {
      setResponse({ success: false, message: "Please provide a valid email." });
    } else {
      await AuthCon.resetPassword(email)?.then((response) => {
        setResponse({ success: response.success, message: response.message });
        if (response.success) {
          setEmail("");
        }
      });
    }
    LoadingCon.setLoading(false);
  };

  return (
    <ForgotPasswordContext.Provider
      value={{
        email,
        response,
        setEmail,
        handleSubmitData,
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export { ForgotPasswordContext, ForgotPasswordProvider };
