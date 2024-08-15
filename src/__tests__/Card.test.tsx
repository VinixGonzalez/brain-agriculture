import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Card } from "@/components";

describe("Card component", () => {
  it("renders with default props", () => {
    const { container } = render(<Card />);
    expect(container).toMatchSnapshot();
  });

  it("renders with title and titleIcon", () => {
    const title = "Test Title";
    const titleIcon = <div>Icon</div>;
    const { container } = render(<Card title={title} titleIcon={titleIcon} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with children", () => {
    const children = <div>Children</div>;
    const { container } = render(<Card>{children}</Card>);
    expect(container).toMatchSnapshot();
  });

  it("renders with className", () => {
    const className = "custom-class";
    const { container } = render(<Card className={className} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with title and children", () => {
    const title = "Test Title";
    const children = <div>Children</div>;
    const { container } = render(<Card title={title}>{children}</Card>);
    expect(container).toMatchSnapshot();
  });

  it("renders with titleIcon and children", () => {
    const titleIcon = <div>Icon</div>;
    const children = <div>Children</div>;
    const { container } = render(<Card titleIcon={titleIcon}>{children}</Card>);
    expect(container).toMatchSnapshot();
  });

  it("renders with all props", () => {
    const title = "Test Title";
    const titleIcon = <div>Icon</div>;
    const children = <div>Children</div>;
    const className = "custom-class";
    const { container } = render(
      <Card title={title} titleIcon={titleIcon} className={className}>
        {children}
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
});
