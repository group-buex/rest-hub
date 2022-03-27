import { getProjectById, getProjectList } from "actions/project";
import { IProjectApi, IProject, IProjectApiRequest } from "interface/project";
import { atom, selector, selectorFamily } from "recoil";

export const selectedApiGroupState = atom({
  key: "project/selectedApiGroupState",
  default: { groupList: [], apiList: [] },
});

export const projectState = atom({
  key: "project/projectState",
  default: null,
});

export const tempApiState = atom({
  key: "project/tempApi",
  default: {
    groupId: "",
    status: "wait",
    seq: 0,
    order: 0,
    method: "get",
    url: "",
    description: "",
    notice: "",
    mockData: {},
    request: [
      {
        seq: 0,
        order: 0,
        isRequired: false,
        name: "",
        type: "",
        defaultValue: "",
        description: "",
      },
    ],
    response: [
      {
        seq: 0,
        order: 0,
        code: 0,
        message: "",
        data: {},
      },
    ],
  },
});

export const tempApiRequestState = atom({
  key: "project/tempApiRequest",
  default: {
    "0": {
      seq: 0,
      order: 0,
      isRequired: false,
      name: "",
      type: "string",
      defaultValue: "",
      description: "",
    },
  },
});

// export const getProjectListSelector = selectorFamily<IProject[], undefined>({
//   key: "project/getProjectListSelector",
//   get:
//     () =>
//     async ({ get }) => {
//       try {
//         const { data } = await getProjectList();
//         return data;
//       } catch (error) {
//         throw error;
//       }
//     },
// });

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
