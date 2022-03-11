import axios from "axios";
import { IProject } from "interface/project";
import { selectorFamily } from "recoil";

export const getProjectSelector = selectorFamily<IProject[], string>({
  key: "getProjectSelector",
  get:
    (param: string) =>
    async ({ get }) => {
      try {
        const { data } = await axios.get(`/api/v1/project/${param}`);
        return data;
      } catch (error) {
        throw error;
      }
    },
});
