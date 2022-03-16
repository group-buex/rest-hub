import { useApiHandler } from "actions";
import axios from "axios";
import Cookie from "js-cookie";

export const getUser = async (userSession: string) => {
  try {
    if (!userSession) return { _id: null };
    axios.defaults.headers.common["accessToken"] = "Bearer " + userSession;
    const { data } = await axios.get("/api/v1/user/check-auth");
    return data;
  } catch (error) {
    axios.defaults.headers.common["accessToken"];
    Cookie.remove("user_session");
    console.error(error);
  }
};

export const login = async (params) => {
  const result = await axios.post("/api/v1/user/login", params);
  if (result) {
    axios.defaults.headers.common["accessToken"] =
      "Bearer " + result.data.refreshToken;

    if (!Cookie.get("user_sessoin")) {
      Cookie.set("user_session", result.data.refreshToken, {
        expires: 14,
        path: "/",
      });
    }
    return result;
  }
  return;
};

export const useLogin = (useToast: boolean = false) =>
  useApiHandler(login, useToast);
