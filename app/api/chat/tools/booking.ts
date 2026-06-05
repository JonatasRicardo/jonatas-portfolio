import { tool } from "ai";
import { z } from "zod/v4";

export const bookingTools = {
  showBookingWidget: tool({
    description:
      "Show an inline booking calendar when the user wants to schedule a free 30-minute consultation call. Always pass name and email when the user already shared them in the chat.",
    inputSchema: z.object({
      reason: z.string().describe("Brief reason why scheduling is being offered"),
      prefillName: z.string().optional().describe("User full name if already mentioned in chat"),
      prefillEmail: z.string().optional().describe("User email if already mentioned in chat"),
      prefillPhone: z.string().optional().describe("User phone or WhatsApp if already mentioned in chat"),
      prefillNotes: z
        .string()
        .optional()
        .describe("Short summary of the user's business or main pain point for the meeting notes"),
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
  prefillPhone?: string;
  prefillNotes?: string;
};
