import React, { createContext } from "react";

import { IAuthFetchContext } from "./AuthFetchContext.types";
import { IProps } from "../../config/config.types";
import axios from "axios";
import config from "../../config/config";

const defaultFetchContext: IAuthFetchContext = {
  authFetch: axios.create({}),
};

const AuthFetchContext = createContext<IAuthFetchContext>(defaultFetchContext);

const AuthFetchProvider = ({ children }: IProps) => {
  const authFetch = axios.create({
    withCredentials: true,
    baseURL: config.paths.home,
    timeout: config.timeout,
  });

  return (
    <AuthFetchContext.Provider
      value={{
        authFetch,
      }}
    >
      {children}
    </AuthFetchContext.Provider>
  );
};

export { AuthFetchContext, AuthFetchProvider };
