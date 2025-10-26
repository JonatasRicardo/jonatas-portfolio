import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileAvatar } from "./index";

describe("ProfileAvatar", () => {
  it("renders image with accessible name", () => {
    render(<ProfileAvatar />);
    expect(screen.getByRole("img", { name: "Photo of Jonatas Ricardo Santos" })).toBeInTheDocument();
  });

  it("applies correct size classes for small, medium and large", () => {
    const { rerender } = render(<ProfileAvatar size="small" data-testid="avatar" />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass("w-12");
    expect(avatar).toHaveClass("h-12");
    expect(avatar).toHaveClass("ring-2");

    rerender(<ProfileAvatar size="medium" data-testid="avatar" />);
    expect(avatar).toHaveClass("w-32");
    expect(avatar).toHaveClass("h-32");
    expect(avatar).toHaveClass("ring-3");

    rerender(<ProfileAvatar size="large" data-testid="avatar" />);
    expect(avatar).toHaveClass("w-64");
    expect(avatar).toHaveClass("h-64");
    expect(avatar).toHaveClass("ring-4");
  });

  it("merges custom className with computed classes", () => {
    render(<ProfileAvatar className="border border-red-500" data-testid="avatar" />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass("border");
    expect(avatar).toHaveClass("border-red-500");
  });
});


