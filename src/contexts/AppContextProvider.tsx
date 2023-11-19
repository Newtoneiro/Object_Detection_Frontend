/**
 * @file AppContextProvider.tsx
 * @description AppContextProvider component.
 */
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

/**
 * @component
 *
 * App provider component.
 *
 * @description
 *
 * This component provides all the necessary contexts to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { AppContextProvider } from './AppContextProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <AppContextProvider>
 *      <SomeOtherComponent />
 *    </AppContextProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 */
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
