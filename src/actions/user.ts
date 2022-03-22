import { useApiHandler } from "hooks/useApiHandler";
import axios from "axios";
import Cookie from "js-cookie";

export const getUser = async (userSession: string) => {
  try {
    if (!userSession) return { _id: null };
    axios.defaults.headers.common["authorization"] = "Bearer " + userSession;
    const { data } = await axios.get(
      "http://localhost:3001/api/v1/user/check-auth"
    );
    return data;
  } catch (error) {
    axios.defaults.headers.common["authorization"];
    Cookie.remove("user_session");
    return error;
  }
};

export const login = async (params) => {
  try {
    const result = await axios.post(`/api/v1/user/login`, params);
    if (result) {
      axios.defaults.headers.common["authorization"] =
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
  } catch (error) {
    axios.defaults.headers.common["authorization"];
    Cookie.remove("user_session");
    console.error(error);
    return error;
  }
};

export const postUser = async (params) => {
  try {
    return await axios.post(`/api/v1/user/sign-up`, params);
  } catch (error) {
    return error;
  }
};

export const postUserProject = async (params) => {
  try {
    return await axios.post("/api/v1/user/project", params);
  } catch (error) {
    return error;
  }
};

/**
 * Hooks
 */

export const usePostUserProject = (useToast: boolean = false) =>
  useApiHandler(postUserProject, useToast);

export const useLogin = (useToast: boolean = false) =>
  useApiHandler(login, useToast);

export const usePostUser = (useToast: boolean = false) =>
  useApiHandler(postUser, useToast);
