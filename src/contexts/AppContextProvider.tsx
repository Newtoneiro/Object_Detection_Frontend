import { AuthFetchProvider } from "./AuthFetchContext/AuthFetchContext";
import { AuthProvider } from "./AuthContext/AuthContext";
import { CameraProvider } from "./CameraContext/CameraContext";
import { ErrorProvider } from "./ErrorContext/ErrorContext";
import { ForgotPasswordProvider } from "./ForgotPasswordContext/ForgotPasswordContext";
import { IProps } from "../config.types";
import { LiveCameraProvider } from "./LiveCameraContext/LiveCameraContext";
import { LoadingProvider } from "./LoadingContext/LoadingContext";
import { LoginProvider } from "./LoginContext/LoginContext";

const AppContextProvider = ({ children }: IProps) => {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <AuthFetchProvider>
          <AuthProvider>
            <LoginProvider>
              <ForgotPasswordProvider>
                <CameraProvider>
                  <LiveCameraProvider>{children}</LiveCameraProvider>
                </CameraProvider>
              </ForgotPasswordProvider>
            </LoginProvider>
          </AuthProvider>
        </AuthFetchProvider>
      </LoadingProvider>
    </ErrorProvider>
  );
};

export default AppContextProvider;
