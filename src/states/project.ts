import axios from "axios";
import { IProject } from "interface/project";
import { atom, selectorFamily } from "recoil";

type GetParameter = string;

export const projectState = atom<IProject[]>({
  key: "projectState",
  default: [],
});

export const getProjectSelector = selectorFamily<IProject[], GetParameter>({
  key: "getProjectSelector",
  get: (param: GetParameter) => async () => {
    try {
      const { data } = await axios.get(`/api/v1/project/${param}`);
      return data as IProject[];
    } catch (error) {
      throw error;
    }
  },
});
