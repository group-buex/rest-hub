import axios from "axios";
import { IProjectApi, IProject } from "interface/project";
import { atom, selectorFamily } from "recoil";

export const selectedApiGroupState = atom({
  key: "project/selectedApiGroupState",
  default: { groupList: [], apiList: [] },
});

export const projectApiState = atom({
  key: "project/projectApiState",
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

type GetApiListByProjectIdSelectorProps = {
  admin: string;
  id: string;
};

export const getApiListByProjectIdSelector = selectorFamily<
  IProjectApi,
  GetApiListByProjectIdSelectorProps
>({
  key: "project/getApiListByProjectIdSelector",
  get:
    ({ admin, id }: GetApiListByProjectIdSelectorProps) =>
    async ({ get }) => {
      try {
        const { data } = await axios.get(`/api/v1/project/${admin}/${id}`);
        return data;
      } catch (error) {
        throw error;
      }
    },
});
