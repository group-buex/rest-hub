import { useApiHandler } from "actions";
import axios from "actions/axios";
import Cookie from "js-cookie";

export const login = async (params) => {
  const result = await axios.post("/api/v1/user/login", params);
  if (result) {
    Cookie.set("user_session", result.data.refreshToken, {
      expires: 14,
      path: "",
    });
    return result;
  }
  return;
};

export const useLogin = (useToast: boolean = false) =>
  useApiHandler(login, useToast);
