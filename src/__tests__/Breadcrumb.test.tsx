import React from "react";
import { render } from "@testing-library/react";
import { Breadcrumb } from "@/components";

describe("Breadcrumb component", () => {
  it("renders the breadcrumb links", () => {
    const crumbs = [
      { name: "Home", isCurrentPage: false, href: "/" },
      { name: "About", isCurrentPage: false, href: "/about" },
      { name: "Contact", isCurrentPage: true, href: "/contact" },
    ];
    const { getAllByRole } = render(<Breadcrumb crumbs={crumbs} />);
    const breadcrumbLinks = getAllByRole("link");

    expect(breadcrumbLinks[0].getAttribute("href")).toBe("/");
    expect(breadcrumbLinks[1].getAttribute("href")).toBe("/about");
  });
});
