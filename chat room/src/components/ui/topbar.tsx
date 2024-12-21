import { MainIcon } from "../icons/mainlogo";
import { ModeToggle } from "./mode-toggle";

export const TopBar = function () {
  return (
    <div>
      <nav className="flex justify-between items-center">
        <div className="pl-2 ">
          <MainIcon />
        </div>
        <div className="pr-2 pt-2">
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};
