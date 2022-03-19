import { getProjectById } from "actions/project";
import axios from "axios";
import { IProjectApi, IProject } from "interface/project";
import { atom, selectorFamily } from "recoil";

export const selectedApiGroupState = atom({
  key: "project/selectedApiGroupState",
  default: { groupList: [], apiList: [] },
});

export const projectState = atom({
  key: "project/projectState",
  default: null,
});

export const getProjectListSelector = selectorFamily<IProject[], undefined>({
  key: "project/getProjectListSelector",
  get:
    () =>
    async ({ get }) => {
      try {
        const { data } = await axios.get("/api/v1/project/list");
        return data;
      } catch (error) {
        throw error;
      }
    },
});

export const getProjectByIdSelector = selectorFamily<IProjectApi, string>({
  key: "project/getProjectByIdSelector",
  get:
    (id: string) =>
    async ({ get }) => {
      try {
        const { data } = await getProjectById(id);
        return data;
      } catch (error) {
        throw error;
      }
    },
});
