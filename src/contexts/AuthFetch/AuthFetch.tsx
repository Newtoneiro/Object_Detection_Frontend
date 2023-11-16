import axios from "axios";
import { globalConfig } from "../../config";

export default axios.create({
  withCredentials: true,
  baseURL: globalConfig.paths.home,
  timeout: globalConfig.timeout,
});
