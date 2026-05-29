import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BookingWidget } from "./booking-widget";

vi.mock("@calcom/embed-react", () => ({
  default: ({ calLink }: { calLink: string }) => (
    <div data-testid="cal-embed">{calLink}</div>
  ),
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("BookingWidget", () => {
  it("renders Cal.com embed when calLink is configured", () => {
    render(
      <BookingWidget
        calLink="jonatas/consultoria-30min"
        eventType="consultoria-30min"
        reason="Escolha um horário."
      />,
    );

    expect(screen.getByText("Escolha um horário.")).toBeInTheDocument();
    expect(screen.getByTestId("cal-embed")).toHaveTextContent("jonatas/consultoria-30min");
  });

  it("renders WhatsApp fallback when calLink is empty", () => {
    render(
      <BookingWidget
        calLink=""
        eventType="consultoria-30min"
        reason="Vamos conversar."
      />,
    );

    expect(screen.getByRole("link", { name: "Conversar no WhatsApp" })).toBeInTheDocument();
  });
});
