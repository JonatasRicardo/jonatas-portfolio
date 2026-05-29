import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BookingWidget } from "./booking-widget";

vi.mock("@calcom/embed-react", () => ({
  default: ({ calLink, config }: { calLink: string; config?: { name?: string; email?: string } }) => (
    <div data-testid="cal-embed">
      {calLink}
      {config?.name ? `|${config.name}` : ""}
      {config?.email ? `|${config.email}` : ""}
    </div>
  ),
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("BookingWidget", () => {
  it("renders Cal.com embed with prefilled attendee data", () => {
    render(
      <BookingWidget
        calLink="jonatas/consultoria-30min"
        eventType="consultoria-30min"
        prefillEmail="maria@example.com"
        prefillName="Maria"
        reason="Escolha um horário."
      />,
    );

    expect(screen.getByText("Escolha um horário.")).toBeInTheDocument();
    expect(screen.getByTestId("cal-embed")).toHaveTextContent(
      "jonatas/consultoria-30min|Maria|maria@example.com",
    );
  });

  it("asks for attendee data before showing the calendar", () => {
    render(
      <BookingWidget
        calLink="jonatas/consultoria-30min"
        eventType="consultoria-30min"
        reason="Vamos marcar sua conversa."
      />,
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.queryByTestId("cal-embed")).not.toBeInTheDocument();
  });

  it("shows the calendar after submitting attendee data", () => {
    render(
      <BookingWidget
        calLink="jonatas/consultoria-30min"
        eventType="consultoria-30min"
        reason="Vamos marcar sua conversa."
      />,
    );

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "João" } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "joao@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Ver horários disponíveis" }));

    expect(screen.getByTestId("cal-embed")).toHaveTextContent(
      "jonatas/consultoria-30min|João|joao@example.com",
    );
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
