"use client";

import React, { createContext, useContext } from "react";
import { Bounce, Id, toast, ToastContainer } from "react-toastify";

type ToastContextType = {
  notify: (msg: string, notifyType: NotifyType) => Id;
};

const ToastContext = createContext<ToastContextType | null>(null);

type ToastContextProviderProps = {
  children: React.ReactNode;
};

type NotifyType = "success" | "error" | "info";

const ToastProvider: React.FC<ToastContextProviderProps> = ({ children }) => {
  const notify = (msg: string, notifyType: NotifyType) =>
    toast[notifyType](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  return (
    <ToastContext.Provider value={{ notify }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContextProvider deve ser usado dentro de um ToastContextProvider"
    );
  }
  return context;
};

export { ToastProvider };
