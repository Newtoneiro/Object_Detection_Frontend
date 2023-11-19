/**
 * @file AuthFetch.tsx
 * @description Axios instance for authenticated requests
 */

import axios from "axios";
import { globalConfig } from "../../config";

/**
 * Axios instance for authenticated requests
 * @constant authFetch
 * @type {AxiosInstance}
 *
 *
 * @example
 * import { authFetch } from "../contexts/AuthFetch/AuthFetch";
 *
 * authFetch.get("/api/endpoint");
 * authFetch.post("/api/endpoint", { data: "data" });
 *
 * @see {@link https://axios-http.com/docs/instance} for more information
 *
 */
export const authFetch = axios.create({
  withCredentials: true,
  baseURL: globalConfig.paths.home,
  timeout: globalConfig.timeout,
});
