import Link from "next/link";
import React from "react";
import { GiFarmer } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";

export const Sidebar: React.FC = () => {
  return (
    <div className="h-full p-4 text-green-800 shadow-lg md:w-52">
      <p className="text-lg">Menu</p>
      <hr />
      <ul className="flex flex-col gap-2 mt-4">
        <li>
          <Link
            href={"/dashboard"}
            className="flex px-2 items-center gap-2 border-b border-b-transparent hover:text-green-600 hover:border-b-green-50 hover:border-b"
          >
            <MdDashboard size={18} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href={"/producers"}
            className="flex px-2 items-center gap-2 border-b border-b-transparent hover:text-green-600 hover:border-b-green-50 hover:border-b"
          >
            <GiFarmer size={18} />
            Produtores
          </Link>
        </li>
      </ul>
    </div>
  );
};
