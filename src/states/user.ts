import IUser from "interface/user";
import { atom, selectorFamily } from "recoil";
import axios from "actions/axios";
// import axios from "axios";

export const userState = atom({
  key: "user/userState",
  default: {
    _id: null,
    seq: 0,
    name: null,
    email: null,
    type: null,
    accessToken: null,
    refreshToken: null,
    project: [],
    createdAt: null,
    updatedAt: null,
  },
});

export const checkAuthSelector = selectorFamily<IUser, any>({
  key: "user/checkAuthSelector",
  get:
    () =>
    async ({ get }) => {
      try {
        const { data } = await axios.post(`/api/v1/user/check-auth`);
        return data;
      } catch (error) {
        throw error;
      }
    },
});
