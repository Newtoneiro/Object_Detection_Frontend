import { IProps } from "../config";
import { AuthProvider } from "./AuthContext";
import { CameraProvider } from "./CameraContext";
import { ErrorProvider } from "./ErrorContext";
import { ForgotPasswordProvider } from "./ForgotPasswordContext";
import { LiveCameraProvider } from "./LiveCameraContext";
import { LoadingProvider } from "./LoadingContext";
import { LocationProvider } from "./LocationContext";
import { LoginProvider } from "./LoginContext";
import { OptionsProvider } from "./OptionsContext";
import { PermissionsProvider } from "./PermissionsContext";

export const AppContextProvider = ({ children }: IProps) => {
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
