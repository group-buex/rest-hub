import { useApiHandler } from "hooks/useApiHandler";
import axios from "axios";

export const getProjectList = async () => {
  try {
    return await axios.get(`/api/v1/project/list`);
  } catch (error) {
    return error;
  }
};
export const getProjectById = async (id: string) => {
  try {
    return await axios.get(`/api/v1/project/v/${id}`);
  } catch (error) {
    return error;
  }
};

export const postProject = async (params) => {
  try {
    return await axios.post("/api/v1/project/new", params);
  } catch (error) {
    return error;
  }
};

export const usePostProject = (useToast: boolean = false) =>
  useApiHandler(postProject, useToast);
