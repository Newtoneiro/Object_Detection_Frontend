import {
  IAuthContext,
  IAuthState,
  IFirebaseError,
  IRegisterData,
  IUserInfo,
} from "./AuthContext.types";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { IProps } from "../../config.types";

const defaultAuthContext: IAuthContext = {
  authState: {
    expiresAt: null,
    userInfo: {},
  },
  setAuthInfo: (authState: IAuthState) => {},
  isAuthenticated: () => false,
  logout: () => {},
  register: (_) => null,
  login: (_) => null,
  loginGoogle: () => null,
  loginAnonymous: () => null,
};

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

const AuthProvider = ({ children }: IProps) => {
  const [authState, setAuthState] = useState<IAuthState>({
    expiresAt: null,
    userInfo: {},
  });

  useEffect(() => {
    const getSavedAuthState = async () => {
      const rawUserInfo = await AsyncStorage.getItem("userInfo");
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const expiresAt = await AsyncStorage.getItem("expiresAt");

      setAuthState({ expiresAt, userInfo });
    };

    getSavedAuthState();
  }, []);

  const setUserCredentials = (
    userCredential: FirebaseAuthTypes.UserCredential
  ) => {
    const newUserInfo: IUserInfo = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      isAnonymous: userCredential.user.isAnonymous,
    };
    const authInfo: IAuthState = {
      expiresAt: String(new Date().getTime() + 86400000), // 24h
      userInfo: newUserInfo,
    };
    setAuthInfo(authInfo);
  };

  const setAuthInfo = (authState: IAuthState) => {
    AsyncStorage.setItem("userInfo", JSON.stringify(authState.userInfo));
    AsyncStorage.setItem(
      "expiresAt",
      authState.expiresAt ? authState.expiresAt : ""
    );

    setAuthState(authState);
  };

  const isAuthenticated = () => {
    if (!authState || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < Number(authState.expiresAt);
  };

  const logout = () => {
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("expiresAt");
    setAuthState({
      expiresAt: null,
      userInfo: {},
    });
  };

  const register = async ({ email, password }: IRegisterData) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          setUserCredentials(userCredentials);
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
          setUserCredentials(userCredentials);
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
          setUserCredentials(userCredentials);
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
          setUserCredentials(userCredentials);
        });

      return { success: true, message: "Login successfull." };
    } catch (error: IFirebaseError | any) {
      return { success: false, message: "Something went wrong." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthInfo,
        isAuthenticated,
        logout,
        register,
        login,
        loginGoogle,
        loginAnonymous,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
