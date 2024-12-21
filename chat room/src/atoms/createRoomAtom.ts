import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

export const roomAtom = atom({
  key: "New id",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
