import React, { createContext, useContext, useState } from "react";

import { ErrorContext } from "../ErrorContext/ErrorContext";
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

  const ErrorCon = useContext(ErrorContext);

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      switch (code) {
        case 401:
          ErrorCon.displayError(
            `[${code}] JWT code is invalid.\nPlease reauthenticate.`,
            "error"
          );
          break;
        case 402:
          ErrorCon.displayError(
            `[${code}] Session expired. Please reauthenticate.`,
            "error"
          );
          break;
        case 500:
          ErrorCon.displayError(`[${code}] Server is not responding.`, "error");
          break;
        default:
          ErrorCon.displayError(`[${code}] Something went wrong.`, "error");
          break;
      }
      return Promise.reject(code);
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
