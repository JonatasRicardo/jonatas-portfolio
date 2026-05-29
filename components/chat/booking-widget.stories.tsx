import type { Meta, StoryObj } from "@storybook/react";

import { BookingWidget } from "./booking-widget";

const meta = {
  title: "0 Chat/BookingWidget",
  component: BookingWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md rounded-xl border border-border bg-[#fdf7ed] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookingWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithCalLink: Story = {
  args: {
    calLink: "jonatas/consultoria-30min",
    eventType: "consultoria-30min",
    reason: "Escolha um horário para nossa conversa de 30 minutos — sem compromisso.",
    prefillName: "Maria",
    prefillEmail: "maria@example.com",
  },
};

export const WithoutCalLink: Story = {
  args: {
    calLink: "",
    eventType: "consultoria-30min",
    reason: "Vamos marcar uma conversa rápida para entender seu negócio.",
  },
};

export const Confirmed: Story = {
  args: {
    calLink: "",
    eventType: "consultoria-30min",
    reason: "Agendamento confirmado (demo estático).",
  },
  render: (args) => (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[#011a24]">Agendamento confirmado!</p>
      <p className="text-sm leading-relaxed text-[#37312d]/80">
        Você receberá um e-mail com os detalhes. Até lá!
      </p>
      <p className="text-xs text-muted-foreground">{args.reason}</p>
    </div>
  ),
};
