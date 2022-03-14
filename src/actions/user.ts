import { useApiHandler } from "actions";
import axios from "axios";

export const login = async (params) => {
  const result = await axios.post("/api/v1/user/login", params);
  window.sessionStorage.setItem("accessToken", result.data.accessToken);
  window.sessionStorage.setItem("refreshToken", result.data.refreshToken);
  return result;
};

export const useLogin = (useToast: boolean = false) =>
  useApiHandler(login, useToast);
