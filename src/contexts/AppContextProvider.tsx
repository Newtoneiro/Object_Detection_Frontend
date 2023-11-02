import { AuthProvider } from "./AuthContext/AuthContext";
import { CameraProvider } from "./CameraContext/CameraContext";
import { ErrorProvider } from "./ErrorContext/ErrorContext";
import { ForgotPasswordProvider } from "./ForgotPasswordContext/ForgotPasswordContext";
import { IProps } from "../config.types";
import { LiveCameraProvider } from "./LiveCameraContext/LiveCameraContext";
import { LoadingProvider } from "./LoadingContext/LoadingContext";
import { LoginProvider } from "./LoginContext/LoginContext";
import { OptionsProvider } from "./OptionsContext/OptionsContext";
import { PermissionsProvider } from "./PermissionsContext/PermissionsContext";
import { LocationProvider } from "./LocationContext/LocationContext";

const AppContextProvider = ({ children }: IProps) => {
  return (
    <ErrorProvider>
      <PermissionsProvider>
        <OptionsProvider>
          <LoadingProvider>
            <LocationProvider>
              <AuthProvider>
                <LoginProvider>
                  <ForgotPasswordProvider>
                    <CameraProvider>
                      <LiveCameraProvider>{children}</LiveCameraProvider>
                    </CameraProvider>
                  </ForgotPasswordProvider>
                </LoginProvider>
              </AuthProvider>
            </LocationProvider>
          </LoadingProvider>
        </OptionsProvider>
      </PermissionsProvider>
    </ErrorProvider>
  );
};

export default AppContextProvider;
