/**
 * @file AuthContext.tsx
 * @description Context that provides authentication state and authentication related functions.
 */
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {
  IAuthContext,
  IAuthState,
  IFirebaseError,
  IUserInputData,
  IUserInfo,
} from "./AuthContext.types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { IProps, globalConfig } from "../../config";
import { authFetch } from "../AuthFetch";
import { ErrorContext } from "../ErrorContext";
import { LoadingContext } from "../LoadingContext";

const defaultAuthContext: IAuthContext = {
  authState: {
    token: null,
    userInfo: null,
  },
  isAuthenticated: null,
  setAuthInfo: (_: IAuthState) => {},
  logout: () => {},
  register: (_) => null,
  login: (_) => null,
  loginGoogle: () => null,
  loginAnonymous: () => null,
  resetPassword: (_) => null,
};

/**
 * @object
 *
 * Authentication context Object.
 *
 * @description
 *
 * This context provides authentication state and authentication related functions.
 *
 * @example
 * // Usage within another component or file:
 * import React, { useContext } from 'react';
 * import { AuthContext } from './AuthContext';
 *
 * const SomeComponent = () => {
 *  const AuthCon = useContext(AuthContext);
 *  return (...)
 * };
 *
 * @see {@link IAuthContext} for more information on the context object.
 *
 */
const AuthContext = createContext<IAuthContext>(defaultAuthContext);

/**
 * @component
 *
 * Authentication provider component.
 *
 * @description
 *
 * This component provides the {@link AuthContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { AuthProvider } from './AuthProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <AuthProvider>
 *      <SomeOtherComponent />
 *    </AuthProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link AuthContext} for the context object.
 */
const AuthProvider = ({ children }: IProps) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    userInfo: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const ErrorCon = useContext(ErrorContext);
  const LoadingCon = useContext(LoadingContext);

  useEffect(() => {
    const getSavedAuthState = async () => {
      LoadingCon.setDisplayLoadingCard(true);
      LoadingCon.setLoadingCardText("Fetching stored user info");
      const rawUserInfo = await AsyncStorage.getItem("userInfo");
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = await AsyncStorage.getItem("token");
      setAuthState({ token, userInfo });
      LoadingCon.setDisplayLoadingCard(false);
    };

    getSavedAuthState();
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      LoadingCon.setDisplayLoadingCard(true);
      LoadingCon.setLoadingCardText("Logging you in");
      if (authState.token) {
        await axios
          .post(
            globalConfig.paths.home + globalConfig.paths.auth + "/verifyToken",
            {
              token: authState.token,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setIsAuthenticated(true);
              authFetch.defaults.headers.common["X-Access-Tokens"] =
                authState.token;

              authFetch.interceptors.response.clear(); // Has to be done there, because the contexts are separated
              authFetch.interceptors.response.use(
                (response) => {
                  return response;
                },
                (error) => {
                  const code =
                    error && error.response ? error.response.status : 0;
                  switch (code) {
                    case 401:
                      ErrorCon.displayError(
                        `[${code}] ${error.response?.data}\nPlease reauthenticate.`,
                        "error"
                      );
                      logout();
                      break;
                    case 0:
                      ErrorCon.displayError(
                        `[${code}] Server is not responding.`,
                        "error"
                      );
                      break;
                    default:
                      break;
                  }
                  return Promise.reject(error);
                }
              );
            } else {
              setIsAuthenticated(false);
            }
          })
          .catch((error: any) => {
            const error_type = error.response?.data || "";
            switch (error_type) {
              case "ERR_JWT_EXPIRED":
                ErrorCon.displayError("Session expired.", "notification");
                break;
              case "ERR_JWT_INVALID":
                ErrorCon.displayError("JWT token is invalid.", "error");
                break;
              default:
                ErrorCon.displayError(
                  "Something went wrong with authentication.",
                  "error"
                );
                break;
            }
            logout();
          });
      } else {
        setIsAuthenticated(false);
      }
      LoadingCon.setDisplayLoadingCard(false);
    };

    verifyToken();
  }, [authState.token]);

  const setUserCredentials = (
    userCredential: FirebaseAuthTypes.UserCredential,
    token: string | null
  ) => {
    const newUserInfo: IUserInfo = {
      email: userCredential.user.email,
      name: userCredential.user.displayName || userCredential.user.email,
      uid: userCredential.user.uid,
      picture: userCredential.user.photoURL || null,
      isAnonymous: userCredential.user.isAnonymous,
      isByGoogleAuth:
        userCredential.additionalUserInfo?.providerId === "google.com",
    };
    const authInfo: IAuthState = {
      token: token,
      userInfo: newUserInfo,
    };
    setAuthInfo(authInfo);
  };

  const updateUserToken = async (
    userCredentials: FirebaseAuthTypes.UserCredential
  ) => {
    await auth()
      .currentUser?.getIdToken()
      .then((token) => {
        setUserCredentials(userCredentials, token);
      });
  };

  const setAuthInfo = (authState: IAuthState) => {
    AsyncStorage.setItem("userInfo", JSON.stringify(authState.userInfo));
    AsyncStorage.setItem("token", authState.token || "");

    setAuthState(authState);
  };

  const logout = async () => {
    LoadingCon.setDisplayLoadingCard(true);
    LoadingCon.setLoadingCardText("Signing out");
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("token");

    setIsAuthenticated(false);
    setAuthState({
      token: null,
      userInfo: null,
    });

    if (authState.userInfo?.isByGoogleAuth) {
      await GoogleSignin.revokeAccess();
    }
    await auth().signOut();

    authFetch.defaults.headers.common["X-Access-Tokens"] = "";
    LoadingCon.setDisplayLoadingCard(false);
  };

  const register = async ({ email, password }: IUserInputData) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          updateUserToken(userCredentials);
        });

      return { success: true, message: "Register successfull." };
    } catch (error: IFirebaseError | any) {
      let message = "Something went wrong.";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use.";
          break;
      }

      return { success: false, message: message };
    }
  };

  const login = async ({ email, password }: IUserInputData) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          updateUserToken(userCredentials);
        });
      return { success: true, message: "Login successfull." };
    } catch (error: IFirebaseError | any) {
      let message = "Something went wrong.";
      switch (error.code) {
        case "auth/user-not-found":
          message = "No such user exists.";
          break;
        case "auth/user-disabled":
          message = "This user has been disabled.";
          break;
        case "auth/wrong-password":
          message = "The password is incorrect.";
          break;
      }

      return { success: false, message: message };
    }
  };

  const loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    } catch (error: any) {
      return { success: false, message: "Service not available." };
    }
    try {
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        .then((userCredentials) => {
          updateUserToken(userCredentials);
        });

      return { success: true, message: "Login successfull." };
    } catch (error: any) {
      return { success: true, message: "Something went wrong." };
    }
  };

  const loginAnonymous = async () => {
    try {
      await auth()
        .signInAnonymously()
        .then(async (userCredentials) => {
          await updateUserToken(userCredentials);
        });

      return { success: true, message: "Login successfull." };
    } catch (error: IFirebaseError | any) {
      return { success: false, message: "Something went wrong." };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);

      return { success: true, message: "Email sent." };
    } catch (error: IFirebaseError | any) {
      let message: string = "Something went wrong.";
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
          message = "No such user exists.";
          break;
      }
      return { success: false, message: message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        isAuthenticated,
        setAuthInfo,
        logout,
        register,
        login,
        loginGoogle,
        loginAnonymous,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
