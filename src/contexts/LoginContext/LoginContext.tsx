/**
 * @file LoginContext.tsx
 * @description LoginContext component.
 */
import { createContext, useContext, useState } from "react";
import {
  ILoginContext,
  IUserInputs,
  IUserInputsAlert,
} from "./LoginContext.types";

import { IProps } from "../../config";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { AuthContext } from "../AuthContext";
import { validateEmail } from "../AuthContext/AuthContext.utils";
import { LoadingContext } from "../LoadingContext";

const defaultUserInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultUserInputsAlert = {
  cause: "",
  inputsIssue: {
    email: false,
    password: false,
    confirmPassword: false,
  },
};

const defaultLoginContext: ILoginContext = {
  userInputs: defaultUserInputs,
  userInputsAlert: defaultUserInputsAlert,
  isLoginMode: false,
  switchLoginMode: () => {},
  setEmail: (_) => {},
  setPassword: (_) => {},
  setConfirmPassword: (_) => {},
  handleSubmitData: () => {},
  loginGoogle: () => {},
  loginAnonymous: () => {},
};

/**
 * @object
 *
 * Login context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for handling
 * login functionality. Mainly used on the {@link LoginPage} component.
 *
 * @example
 * import { LoginContext } from "../contexts/LoginContext/LoginContext";
 *
 * const CameraPage = () => {
 *  const LoginCon = useContext(LoginContext);
 *
 *  LoginContext.handleSubmitData();
 *  return (...)
 * };
 *
 * @see {@link ILoginContext} for more information on the context object
 */
const LoginContext = createContext<ILoginContext>(defaultLoginContext);

/**
 * @component
 *
 * Login provider component.
 *
 * @description
 *
 * This component provides the {@link LoginContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { LoginProvider } from './LoginProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <LoginProvider>
 *      <SomeOtherComponent />
 *    </LoginProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link LoginContext} for the context object.
 */
const LoginProvider = ({ children }: IProps) => {
  const [isLoginMode, setIsLoginMode] = useState<Boolean>(true);
  const [userInputs, setUserInputs] = useState<IUserInputs>(defaultUserInputs);
  const [userInputsAlert, setUserInputsAlert] = useState<IUserInputsAlert>(
    defaultUserInputsAlert
  );

  const AuthCon = useContext(AuthContext);
  const LoadingCon = useContext(LoadingContext);

  const switchLoginMode = () => {
    clearUserInputs();
    setIsLoginMode((prev) => !prev);
  };

  const setEmail = (text: string) => {
    setUserInputs((userInputs) => {
      return {
        email: text,
        password: userInputs.password,
        confirmPassword: userInputs.confirmPassword,
      };
    });
  };

  const setPassword = (text: string) => {
    setUserInputs((userInputs) => {
      return {
        email: userInputs.email,
        password: text,
        confirmPassword: userInputs.confirmPassword,
      };
    });
  };

  const setConfirmPassword = (text: string) => {
    setUserInputs((userInputs) => {
      return {
        email: userInputs.email,
        password: userInputs.password,
        confirmPassword: text,
      };
    });
  };

  const clearUserInputs = () => {
    setUserInputsAlert(defaultUserInputsAlert);
    setUserInputs(defaultUserInputs);
  };

  const handleSubmitData = async () => {
    LoadingCon.setLoading(true);
    if (isLoginMode) {
      if (verifyLogin()) {
        await AuthCon.login({
          email: userInputs.email,
          password: userInputs.password,
        })?.then((status) => {
          if (!status.success) {
            setUserInputsAlert({
              cause: status.message,
              inputsIssue: {
                email: false,
                password: false,
                confirmPassword: false,
              },
            });
          } else {
            clearUserInputs();
            setIsLoginMode(true);
          }
        });
      }
    } else {
      if (verifyRegister()) {
        await AuthCon.register({
          email: userInputs.email,
          password: userInputs.password,
        })?.then((status) => {
          if (!status.success) {
            setUserInputsAlert({
              cause: status.message,
              inputsIssue: {
                email: false,
                password: false,
                confirmPassword: false,
              },
            });
          } else {
            clearUserInputs();
            setIsLoginMode(true);
          }
        });
      }
    }
    LoadingCon.setLoading(false);
  };

  const verifyLogin = () => {
    if (userInputs.email == "") {
      setUserInputsAlert({
        cause: "Please enter email.",
        inputsIssue: { email: true, password: false, confirmPassword: false },
      });
      return false;
    }
    if (!validateEmail(userInputs.email)) {
      setUserInputsAlert({
        cause: "Invalid email.",
        inputsIssue: {
          email: true,
          password: false,
          confirmPassword: false,
        },
      });
      return false;
    }
    if (userInputs.password == "") {
      setUserInputsAlert({
        cause: "Please enter password.",
        inputsIssue: {
          email: false,
          password: true,
          confirmPassword: false,
        },
      });
      return false;
    }
    return true;
  };

  const verifyRegister = () => {
    if (!verifyLogin()) {
      return false;
    }
    if (userInputs.confirmPassword == "") {
      setUserInputsAlert({
        cause: "Please reenter password.",
        inputsIssue: {
          email: false,
          password: false,
          confirmPassword: true,
        },
      });
      return false;
    }
    if (userInputs.password != userInputs.confirmPassword) {
      setUserInputsAlert({
        cause: "Passwords don't match.",
        inputsIssue: { email: false, password: true, confirmPassword: true },
      });
      return false;
    }
    if (userInputs.password.length < 6) {
      setUserInputsAlert({
        cause: "Password should be at least 6 characters.",
        inputsIssue: { email: false, password: true, confirmPassword: true },
      });
      return false;
    }
    return true;
  };

  const loginGoogle = async () => {
    LoadingCon.setLoading(true);
    await AuthCon.loginGoogle();
    LoadingCon.setLoading(false);
  };

  const loginAnonymous = async () => {
    LoadingCon.setLoading(true);
    await AuthCon.loginAnonymous();
    LoadingCon.setLoading(false);
  };

  return (
    <LoginContext.Provider
      value={{
        userInputs,
        userInputsAlert,
        isLoginMode,
        switchLoginMode,
        setEmail,
        setPassword,
        setConfirmPassword,
        handleSubmitData,
        loginGoogle,
        loginAnonymous,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
