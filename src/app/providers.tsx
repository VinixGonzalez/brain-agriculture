import React from "react";
import { GlobalProvider } from "@/app/global-context";
import { ChakraProvider } from "@chakra-ui/react";
import { ModalProvider, ToastProvider } from "@/hooks";
import "react-toastify/dist/ReactToastify.css";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <GlobalProvider>
      <ToastProvider>
        <ChakraProvider>
          <ModalProvider>{children}</ModalProvider>
        </ChakraProvider>
      </ToastProvider>
    </GlobalProvider>
  );
};
