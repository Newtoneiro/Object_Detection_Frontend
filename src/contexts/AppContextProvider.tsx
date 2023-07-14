import { AuthProvider } from "./AuthContext/AuthContext";
import { CameraProvider } from "./CameraContext/CameraContext";
import { ForgotPasswordProvider } from "./ForgotPasswordContext/ForgotPasswordContext";
import { IProps } from "../config.types";
import { LoginProvider } from "./LoginContext/LoginContext";

const AppContextProvider = ({ children }: IProps) => {
  return (
    <AuthProvider>
      <LoginProvider>
        <ForgotPasswordProvider>
          <CameraProvider>{children}</CameraProvider>
        </ForgotPasswordProvider>
      </LoginProvider>
    </AuthProvider>
  );
};

export default AppContextProvider;
