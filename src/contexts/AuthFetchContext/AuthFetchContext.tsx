import React, { createContext } from "react";

import { IAuthFetchContext } from "./AuthFetchContext.types";
import { IProps } from "../../config.types";
import axios from "axios";
import config from "../../config";

const defaultFetchContext: IAuthFetchContext = {
  authFetch: axios.create({}),
};

const AuthFetchContext = createContext<IAuthFetchContext>(defaultFetchContext);

const AuthFetchProvider = ({ children }: IProps) => {
  const authFetch = axios.create({
    withCredentials: true,
    baseURL: config.api_path,
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log("error code", code);
      }
      return Promise.reject(error);
    }
  );

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
