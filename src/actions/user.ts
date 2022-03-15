import { useApiHandler } from "actions";
import axios from "axios";
// import cookie from 'js-cookie'
import Cookie from "js-cookie";

export const login = async (params) => {
  const result = await axios.post("/api/v1/user/login", params);
  Cookie.set("user_session", result.data.accessToken, { expires: 7, path: "" });
  Cookie.set("user_session_rf", result.data.refreshToken, {
    expires: 14,
    path: "",
  });
  return result;
};

export const useLogin = (useToast: boolean = false) =>
  useApiHandler(login, useToast);
