import { useApiHandler } from "actions";
import axios from "axios";

export const postProject = async (params) => {
  return await axios.post("/api/v1/project", params);
};

export const usePostProject = (useToast: boolean = false) =>
  useApiHandler(postProject, useToast);
