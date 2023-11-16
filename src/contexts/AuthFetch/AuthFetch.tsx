import axios from "axios";
import { globalConfig } from "../../config";

export const authFetch = axios.create({
  withCredentials: true,
  baseURL: globalConfig.paths.home,
  timeout: globalConfig.timeout,
});
