// ModalProvider.test.tsx
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ModalProvider, useModal } from "@/hooks";
import { ChakraProvider } from "@chakra-ui/react";

const TestComponent = () => {
  const { openModal, onClose } = useModal();

  return (
    <div>
      <button
        onClick={() =>
          openModal({
            title: "Teste de Título",
            content: "Teste de Conteúdo",
            footer: <button onClick={onClose}>Fechar</button>,
          })
        }
      >
        Abrir Modal
      </button>
    </div>
  );
};

describe("ModalProvider", () => {
  const renderWithProvider = (ui: React.ReactNode) => {
    return render(
      <ChakraProvider>
        <ModalProvider>{ui}</ModalProvider>
      </ChakraProvider>
    );
  };

  test("should open and close the modal with properly content", async () => {
    renderWithProvider(<TestComponent />);

    const openButton = screen.getByText("Abrir Modal");
    fireEvent.click(openButton);

    expect(screen.getByText("Teste de Título")).toBeInTheDocument();
    expect(screen.getByText("Teste de Conteúdo")).toBeInTheDocument();
    expect(screen.getByText("Fechar")).toBeInTheDocument();

    const closeButton = screen.getByText("Fechar");
    fireEvent.click(closeButton);

    // Use waitForElementToBeRemoved to handle animations or delayed removal
    await waitForElementToBeRemoved(() =>
      screen.queryByText("Teste de Título")
    );

    expect(screen.queryByText("Teste de Título")).not.toBeInTheDocument();
    expect(screen.queryByText("Teste de Conteúdo")).not.toBeInTheDocument();
  });
});
