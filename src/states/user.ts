import IUser from "interface/user";
import { atom, selectorFamily } from "recoil";
import { getUser } from "actions/user";

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

export const getUserSelector = selectorFamily<IUser, string>({
  key: "user/getUserSelector",
  get:
    (user_session: string) =>
    async ({ get }) => {
      if (!user_session) return { _id: null };
      return await getUser(user_session);
    },
});
