import {
  IAuthContext,
  IAuthResponse,
  IAuthState,
  IRegisterData,
  IUserInfo,
} from "./AuthContext.types";
import { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProps } from "../../config.types";
import auth from "@react-native-firebase/auth";

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
    const response = await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const newUserInfo: IUserInfo = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        const authInfo: IAuthState = {
          expiresAt: String(new Date().getTime() + 86400000), // 24h
          userInfo: newUserInfo,
        };
        console.log(authInfo);
        setAuthInfo(authInfo);
      })
      .catch((error) => {
        console.log(error);
      });
    if (response != undefined) {
      return { success: true, message: "Register successfull." };
    } else {
      return { success: false, message: "Something went wrong." };
    }
  };

  const login = async ({ email, password }: IRegisterData) => {
    const response = await auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const newUserInfo: IUserInfo = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        const authInfo: IAuthState = {
          expiresAt: String(new Date().getTime() + 86400000), // 24h
          userInfo: newUserInfo,
        };
        console.log(authInfo);
        setAuthInfo(authInfo);
      })
      .catch((error) => {
        console.log(error);
      });
    if (response != undefined) {
      return { success: true, message: "Login successfull." };
    } else {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
