import { atom } from "recoil";

export const messageAtom = atom({
  key: "messages",
  default: [{ message: "joined", id: "sys", username: "system" }],
});
