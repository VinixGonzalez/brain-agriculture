import React from "react";
import { render } from "@testing-library/react";
import { Input } from "@/components";

describe("Input component", () => {
  it("renders the label", () => {
    const { getByText } = render(<Input label="Test Label" />);
    expect(getByText("Test Label")).toBeInTheDocument();
  });

  it("renders the input field", () => {
    const { getByPlaceholderText } = render(<Input />);
    expect(getByPlaceholderText("Digite...")).toBeInTheDocument();
  });

  it("renders the error message", () => {
    const { getByText } = render(<Input error={true} errorMsg="Test Error" />);
    expect(getByText("Test Error")).toBeInTheDocument();
  });

  it("applies the error class when error is true", () => {
    const { getByPlaceholderText } = render(<Input error={true} />);
    expect(getByPlaceholderText("Digite...")).toHaveClass("border-red-500");
  });

  it("applies the default class when error is false", () => {
    const { getByPlaceholderText } = render(<Input />);
    expect(getByPlaceholderText("Digite...")).toHaveClass("border-gray-300");
  });

  it("renders the input field with the correct id", () => {
    const { getByPlaceholderText } = render(<Input id="test-id" />);
    expect(getByPlaceholderText("Digite...")).toHaveAttribute("id", "test-id");
  });
});
