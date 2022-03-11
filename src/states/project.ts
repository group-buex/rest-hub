import axios from "axios";
import { IProject } from "interface/project";
import { selectorFamily } from "recoil";

type GetParameter = string;

export const getProjectSelector = selectorFamily<Array<IProject>, GetParameter>(
  {
    key: "getProjectSelector",
    get: (param: GetParameter) => async () => {
      try {
        const { data } = await axios.get(`/api/v1/project/${param}`);
        return data as Array<IProject>;
      } catch (error) {
        throw error;
      }
    },
  }
);
