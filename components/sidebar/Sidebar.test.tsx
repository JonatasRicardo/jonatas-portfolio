import { render, screen } from "@testing-library/react";
import Sidebar from ".";

describe("Sidebar", () => {
  it("renders avatar link to home and social links", () => {
    render(<Sidebar />);

    const homeLinks = screen.getAllByRole("link", { name: "" });
    expect(homeLinks.some((a) => (a as HTMLAnchorElement).getAttribute("href") === "/")).toBe(true);

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(1);
  });

  it("displays headings with name and role on large screens", () => {
    render(<Sidebar />);
    expect(screen.getByText("Jonatas Ricardo S. Santos")).toBeInTheDocument();
    expect(screen.getByText("Fullstack Software Engineer")).toBeInTheDocument();
  });

});


