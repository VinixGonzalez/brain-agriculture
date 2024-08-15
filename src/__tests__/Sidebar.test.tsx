// Sidebar.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sidebar } from "@/components";

describe("Sidebar", () => {
  test("should render links correctly", () => {
    render(<Sidebar />);

    expect(screen.getByText("Menu")).toBeInTheDocument();

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Produtores")).toBeInTheDocument();
  });

  test("should render icons correctly", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("MdDashboard")).toBeInTheDocument();
    expect(screen.getByTestId("GiFarmer")).toBeInTheDocument();
  });
});
