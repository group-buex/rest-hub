import axios from "axios";
import cookie from "js-cookie";

const api = axios.create({});

const userSession: string = cookie.get("user_session") || null;

userSession !== null &&
  (api.defaults.headers.common["accessToken"] = "Bearer " + userSession);

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
