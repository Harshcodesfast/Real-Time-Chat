import React, { Children } from "react";
interface BtnPrp {
  children: React.ReactNode;
}

export const Buttoncomp: React.FC<BtnPrp> = function ({ children }) {
  return (
    <div
      className="bg-white text-black p-4 cursor-pointer rounded hover:bg-gray-200"
      onClick={() => alert("Button clicked!")}
    >
      {Children}
    </div>
  );
};
