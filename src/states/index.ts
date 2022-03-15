import { atom } from "recoil";

export const defaultState = atom({
  key: "index/defaultState",
  default: null,
});

export const abc = {
  looseState: atom({
    key: "index/looseState",
    default: null,
  }),
};
