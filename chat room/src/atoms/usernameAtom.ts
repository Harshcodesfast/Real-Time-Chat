import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const usernameAtom = atom({
  key: "username",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
