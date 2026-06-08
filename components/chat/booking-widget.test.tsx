import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BookingWidget } from "./booking-widget";

describe("BookingWidget", () => {
  it("renders prefilled booking link with attendee data", () => {
    render(
      <BookingWidget
        calLink="https://cal.com/jonatas/consultoria-30min"
        eventType="consultoria-30min"
        prefillName="Maria"
        reason="Escolha um horário."
      />,
    );

    expect(screen.getByText("Escolha um horário.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Abrir agenda do Calendário" })).toHaveAttribute(
      "href",
      expect.stringContaining("https://cal.com/jonatas/consultoria-30min?name=Maria"),
    );
  });

  it("asks for attendee data before showing the calendar", () => {
    render(
      <BookingWidget
        calLink="https://cal.com/jonatas/consultoria-30min"
        eventType="consultoria-30min"
        reason="Vamos marcar sua conversa."
      />,
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Abrir agenda do Calendário" })).not.toBeInTheDocument();
  });

  it("shows the calendar after submitting attendee data", () => {
    render(
      <BookingWidget
        calLink="https://cal.com/jonatas/consultoria-30min"
        eventType="consultoria-30min"
        reason="Vamos marcar sua conversa."
      />,
    );

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "João" } });
    fireEvent.change(screen.getByLabelText(/WhatsApp/), { target: { value: "21999999999" } });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar dados e abrir agenda" }));

    const button = screen.getByRole("link", { name: "Abrir agenda do Calendário" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      "href",
      expect.stringContaining("https://cal.com/jonatas/consultoria-30min?name=Jo%C3%A3o&attendeePhoneNumber=5521999999999"),
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
