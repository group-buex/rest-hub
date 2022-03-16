import IUser from "interface/user";
import { atom, selectorFamily } from "recoil";
import axios from "actions/axios";

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

export const checkAuthSelector = selectorFamily<IUser, string>({
  key: "user/checkAuthSelector",
  get:
    (user_session: string) =>
    async ({ get }) => {
      try {
        const { data } = await axios.get(`/api/v1/user/check-auth`);
        return data;
      } catch (error) {
        throw error;
      }
    },
});
