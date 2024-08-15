import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "@/components";

describe("Button component", () => {
  it("renders with default props", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    const { getByText } = render(<Button btnText="Custom text" />);
    expect(getByText("Custom text")).toBeInTheDocument();
  });

  it("renders with small size", () => {
    const { getByText } = render(<Button size="small">Small button</Button>);
    expect(getByText("Small button")).toHaveClass("py-2 px-4 text-xs");
  });

  it("renders with primary variant", () => {
    const { getByText } = render(
      <Button variant="primary">Primary button</Button>
    );
    expect(getByText("Primary button")).toHaveClass("bg-green-800 text-white");
  });

  it("renders with secondary variant", () => {
    const { getByText } = render(
      <Button variant="secondary">Secondary button</Button>
    );
    expect(getByText("Secondary button")).toHaveClass(
      "bg-white text-green-800"
    );
  });

  it("calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    const { getByText } = render(<Button disabled>Disabled button</Button>);
    expect(getByText("Disabled button")).toBeDisabled();
  });
});
