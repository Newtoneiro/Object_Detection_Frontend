import {
  IAuthContext,
  IAuthState,
  IFirebaseError,
  IRegisterData,
  IUserInfo,
} from "./AuthContext.types";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthFetchContext } from "../AuthFetchContext/AuthFetchContext";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { IProps } from "../../config.types";
import axios from "axios";
import config from "../../config";

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

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

const AuthProvider = ({ children }: IProps) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    userInfo: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const AuthFetchCon = useContext(AuthFetchContext);
  const ErrorCon = useContext(ErrorContext);

  useEffect(() => {
    const getSavedAuthState = async () => {
      const rawUserInfo = await AsyncStorage.getItem("userInfo");
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = await AsyncStorage.getItem("token");

      setAuthState({ token, userInfo });
    };

    getSavedAuthState();
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      if (authState.token) {
        axios
          .post(config.api_path + "/auth" + "/verifyToken", {
            token: authState.token,
          })
          .then((response) => {
            if (response.status === 200) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
              setAuthState({ token: null, userInfo: null });
            }
          })
          .catch((e: any) => {
            ErrorCon.displayError(
              "We've encountered some troubles logging in.",
              "error"
            );
            setIsAuthenticated(false);
            setAuthState({ token: null, userInfo: null });
          });
      } else {
        setIsAuthenticated(false);
        setAuthState({ token: null, userInfo: null });
      }
    };

    verifyToken();
  }, [authState.token]);

  const setUserCredentials = async (
    userCredential: FirebaseAuthTypes.UserCredential,
    token: string | null
  ) => {
    const newUserInfo: IUserInfo = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      isAnonymous: userCredential.user.isAnonymous,
    };
    const authInfo: IAuthState = {
      token: token,
      userInfo: newUserInfo,
    };
    setAuthInfo(authInfo);
  };

  const updateUserToken = (
    userCredentials: FirebaseAuthTypes.UserCredential
  ) => {
    auth()
      .currentUser?.getIdToken()
      .then(function (token) {
        AuthFetchCon.authFetch.defaults.headers.common["X-Access-Tokens"] =
          token;
        setUserCredentials(userCredentials, token);
      });
  };

  const setAuthInfo = (authState: IAuthState) => {
    AsyncStorage.setItem("userInfo", JSON.stringify(authState.userInfo));
    AsyncStorage.setItem("token", authState.token || "");

    setAuthState(authState);
  };

  const logout = () => {
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("token");
    setAuthState({
      token: null,
      userInfo: null,
    });
  };

  const register = async ({ email, password }: IRegisterData) => {
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

  const login = async ({ email, password }: IRegisterData) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          updateUserToken(userCredentials);
        });
      return { success: true, message: "Login successfull." };
    } catch (error: IFirebaseError | any) {
      let message = "Something went wrong.";
      console.log(error.code);
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
        .then((userCredentials) => {
          updateUserToken(userCredentials);
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
