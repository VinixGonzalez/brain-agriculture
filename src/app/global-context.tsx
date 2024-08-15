"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface GlobalContextType {
  value: string;
  setValue: (value: string) => void;
}

const defaultContextValue: GlobalContextType = {
  value: "",
  setValue: () => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultContextValue);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string>("");
  return (
    <GlobalContext.Provider value={{ value, setValue }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext deve ser usado dentro de um GlobalProvider"
    );
  }
  return context;
};

export { GlobalProvider };
