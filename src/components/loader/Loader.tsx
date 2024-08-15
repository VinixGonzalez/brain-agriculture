import { CircularProgress } from "@chakra-ui/react";
import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="bg-slate-50 flex items-center justify-center h-full">
      <CircularProgress color="#166534 " isIndeterminate size={"120px"} />
    </div>
  );
};
