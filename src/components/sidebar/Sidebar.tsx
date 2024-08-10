import Link from "next/link";
import React from "react";

export const Sidebar: React.FC = () => {
  return (
    <div className="bg-red-800 w-48 h-full p-2">
      <ul>
        <li>
          <Link href={"/producer"}>Produtores Rurais</Link>
        </li>
      </ul>
    </div>
  );
};
