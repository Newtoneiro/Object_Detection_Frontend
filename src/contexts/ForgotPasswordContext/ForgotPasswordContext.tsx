import { createContext, useContext, useState } from "react";
import {
  IForgotPasswordContext,
  IResetPasswordResponse,
} from "./ForgotPasswordContext.types";

import { IProps } from "../../config";
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

const ForgotPasswordContext = createContext<IForgotPasswordContext>(
  defaultForgotPasswordContext
);

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
