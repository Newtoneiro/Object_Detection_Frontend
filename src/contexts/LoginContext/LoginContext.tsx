import { ILoginContext, IUserInputs } from "./LoginContext.types";
import { createContext, useState } from "react";

import { IProps } from "../../config.types";

const defaultUserInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultLoginContext: ILoginContext = {
  userInputs: defaultUserInputs,
  isLoginMode: false,
  switchLoginMode: () => {},
  setEmail: (_) => {},
  setPassword: (_) => {},
  setConfirmPassword: (_) => {},
};

const LoginContext = createContext<ILoginContext>(defaultLoginContext);

const LoginProvider = ({ children }: IProps) => {
  const [isLoginMode, setIsLoginMode] = useState<Boolean>(true);
  const [userInputs, setUserInputs] = useState<IUserInputs>(defaultUserInputs);

  const switchLoginMode = () => {
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

  return (
    <LoginContext.Provider
      value={{
        userInputs,
        isLoginMode,
        switchLoginMode,
        setEmail,
        setPassword,
        setConfirmPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
