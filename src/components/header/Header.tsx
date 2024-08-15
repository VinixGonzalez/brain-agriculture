import React from "react";
import { Drawer } from "@/components";

export const Header: React.FC = () => {
  return (
    <header className="p-4 text-green-800 shadow-md flex items-center justify-between z-10">
      <span className="text-xl">Brain Agriculture</span>
      <div className="sm:hidden">
        <Drawer />
      </div>
    </header>
  );
};
