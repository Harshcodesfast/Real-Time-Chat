import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const useridAtom = atom({
  key: "userid",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
