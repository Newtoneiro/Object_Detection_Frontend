import axios from "axios";
import config from "../../config";

export default axios.create({
  withCredentials: true,
  baseURL: config.paths.home,
  timeout: config.timeout,
});
