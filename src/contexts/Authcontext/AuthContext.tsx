import { IAuthContext, IAuthState } from "./AuthContext.types";
import { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProps } from "../../config.types";

const defaultAuthContext: IAuthContext = {
  authState: {
    expiresAt: null,
    userInfo: {},
  },
  setAuthInfo: (authState: IAuthState) => {},
  isAuthenticated: () => false,
  logout: () => {},
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
    return false;
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

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthInfo,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
