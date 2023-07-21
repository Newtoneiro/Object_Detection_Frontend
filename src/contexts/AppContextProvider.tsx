import { AuthProvider } from "./AuthContext/AuthContext";
import { CameraProvider } from "./CameraContext/CameraContext";
import { ErrorProvider } from "./ErrorContext/ErrorContext";
import { ForgotPasswordProvider } from "./ForgotPasswordContext/ForgotPasswordContext";
import { IProps } from "../config.types";
import { LoadingProvider } from "./LoadingContext/LoadingContext";
import { LoginProvider } from "./LoginContext/LoginContext";

const AppContextProvider = ({ children }: IProps) => {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <AuthProvider>
          <LoginProvider>
            <ForgotPasswordProvider>
              <CameraProvider>{children}</CameraProvider>
            </ForgotPasswordProvider>
          </LoginProvider>
        </AuthProvider>
      </LoadingProvider>
    </ErrorProvider>
  );
};

export default AppContextProvider;
