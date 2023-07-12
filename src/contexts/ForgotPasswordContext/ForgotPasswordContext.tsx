import {
  IForgotPasswordContext,
  IResetPasswordResponse,
} from "./ForgotPasswordContext.types";
import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "../Authcontext/AuthContext";
import { IProps } from "../../config.types";
import { validateEmail } from "../Authcontext/AuthContext.utils";

const defaultResetPasswordResponse: IResetPasswordResponse = {
  success: true,
  message: "",
};

const defaultForgotPasswordContext: IForgotPasswordContext = {
  email: "",
  loading: true,
  response: defaultResetPasswordResponse,
  setEmail: (_) => {},
  handleSubmitData: () => {},
};

const ForgotPasswordContext = createContext<IForgotPasswordContext>(
  defaultForgotPasswordContext
);

const ForgotPasswordProvider = ({ children }: IProps) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IResetPasswordResponse>(
    defaultResetPasswordResponse
  );

  const AuthCon = useContext(AuthContext);

  const handleSubmitData = async () => {
    setLoading(true);

    if (!validateEmail(email)) {
      setResponse({ success: true, message: "Please provide a valid email." });
    } else {
      await AuthCon.resetPassword(email)?.then((response) => {
        setResponse({ success: response.success, message: response.message });
        if (response.success) {
          setEmail("");
        }
      });
    }

    setLoading(false);
  };

  return (
    <ForgotPasswordContext.Provider
      value={{
        email,
        loading,
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
