import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SocialLinks } from ".";

describe("SocialLinks", () => {
  beforeEach(() => {
    // @ts-expect-error jsdom
    global.navigator.clipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
  });

  it("renders external links (LinkedIn, GitHub, Resume)", () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole("link");
    expect(links.some((a) => (a as HTMLAnchorElement).href.includes("linkedin.com"))).toBe(true);
    expect(links.some((a) => (a as HTMLAnchorElement).href.includes("github.com"))).toBe(true);
    expect(links.some((a) => (a as HTMLAnchorElement).href.includes("JonatasSantos-Resume.pdf"))).toBe(true);
  });

  it("desktop: copies email to clipboard when clicking email button", async () => {
    // Simulate desktop
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
    render(<SocialLinks />);
    // The first visible link has no accessible name; get it by mailto href
    const mailto = screen.getAllByRole("link").find((a) => (a as HTMLAnchorElement).getAttribute("href")?.startsWith("mailto:"));
    expect(mailto).toBeTruthy();
    if (mailto) fireEvent.click(mailto);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("jonatasricardo90@gmail.com");
  });

  it("desktop: copies phone number to clipboard when clicking phone button", async () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
    render(<SocialLinks />);
    const tel = screen.getAllByRole("link").find((a) => (a as HTMLAnchorElement).getAttribute("href")?.startsWith("tel:"));
    expect(tel).toBeTruthy();
    if (tel) fireEvent.click(tel);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("+5521980484957");
  });

  it("mobile: does not copy when clicking email/phone buttons", async () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(375);
    render(<SocialLinks />);
    const mailto = screen.getAllByRole("link").find((a) => (a as HTMLAnchorElement).getAttribute("href")?.startsWith("mailto:"));
    const tel = screen.getAllByRole("link").find((a) => (a as HTMLAnchorElement).getAttribute("href")?.startsWith("tel:"));
    if (mailto) fireEvent.click(mailto);
    if (tel) fireEvent.click(tel);
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });
});


