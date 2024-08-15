"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";

interface ModalContentProps {
  title?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

type ModalContextType = {
  openModal: (content: ModalContentProps) => void;
  onClose: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState<ModalContentProps>({});
  const openModal = (content: ModalContentProps) => {
    setModalContent(content);
    onOpen();
  };

  return (
    <ModalContext.Provider value={{ openModal, onClose }}>
      {children}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalContent.title || "Título"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalContent.content || "Conteúdo"}</ModalBody>
          {modalContent.footer && (
            <ModalFooter>{modalContent.footer}</ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider");
  }
  return context;
};

export { ModalProvider };
