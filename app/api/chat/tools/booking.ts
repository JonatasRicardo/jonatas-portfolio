import { tool } from "ai";
import { z } from "zod";

export const bookingTools = {
  showBookingWidget: tool({
    description:
      "Show an inline booking calendar when the user wants to schedule a free 30-minute consultation call. Use when they express interest in talking, booking, scheduling, or meeting.",
    inputSchema: z.object({
      reason: z.string().describe("Brief reason why scheduling is being offered"),
      prefillName: z.string().optional().describe("User name if already mentioned"),
      prefillEmail: z.string().optional().describe("User email if already mentioned"),
    }),
    execute: async (input) => ({
      eventType: process.env.CALCOM_EVENT_TYPE_SLUG ?? "consultoria-30min",
      calLink: process.env.NEXT_PUBLIC_CALCOM_LINK ?? "",
      ...input,
    }),
  }),
};

export type BookingWidgetOutput = {
  eventType: string;
  calLink: string;
  reason: string;
  prefillName?: string;
  prefillEmail?: string;
};
