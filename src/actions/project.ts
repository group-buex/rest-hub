import { useApiHandler } from "actions";
import axios from "axios";

export const getProjectList = async () => {
  return await axios.get(`/api/v1/project/list`);
};
export const getProjectById = async (id: string) => {
  return await axios.get(`/api/v1/project/v/${id}`);
};

export const postProject = async (params) => {
  return await axios.post("/api/v1/project/new", params);
};

export const usePostProject = (useToast: boolean = false) =>
  useApiHandler(postProject, useToast);
