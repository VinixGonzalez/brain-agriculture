// ToastProvider.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // para asserções estendidas
import { ToastProvider } from "@/hooks";
import TestComponent from "../components/test-component/TestComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const renderWithProvider = (ui: React.ReactNode) => {
  return render(
    <ToastProvider>
      {ui}
      <ToastContainer />
    </ToastProvider>
  );
};

describe("ToastProvider", () => {
  test("should show success toast", () => {
    renderWithProvider(<TestComponent />);

    const button = screen.getByText("Show Success Toast");
    fireEvent.click(button);

    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  test("should show error toast", () => {
    renderWithProvider(<TestComponent />);

    const button = screen.getByText("Show Error Toast");
    fireEvent.click(button);

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("should show info toast", () => {
    renderWithProvider(<TestComponent />);

    const button = screen.getByText("Show Info Toast");
    fireEvent.click(button);

    expect(screen.getByText("Info message")).toBeInTheDocument();
  });
});
