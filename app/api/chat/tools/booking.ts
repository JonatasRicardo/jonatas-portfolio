import { tool } from "ai"
import { z } from "zod/v4"

export const bookingTools = {
  showBookingWidget: tool({
    description:
      "Return a scheduling link for Cal.com when the user wants to schedule a free 15-minute consultation call. Always pass name and phone if already shared in the chat.",
    inputSchema: z.object({
      reason: z.string().describe("Brief reason why scheduling is being offered"),
      prefillName: z.string().optional().describe("User full name if already mentioned in chat"),
      prefillPhone: z.string().optional().describe("User phone or WhatsApp if already mentioned in chat"),
      prefillNotes: z
        .string()
        .optional()
        .describe("Short summary of the user's business or main pain point for the meeting notes"),
    }),
    execute: async (input) => ({
      eventType: process.env.CALCOM_EVENT_TYPE_SLUG ?? "consultoria-30min",
      calLink:
        process.env.NEXT_PUBLIC_CALCOM_LINK ??
        process.env.CALCOM_LINK ??
        "https://cal.com/jonatasricardo/15min",
      ...input,
    }),
  }),
}

export type BookingWidgetOutput = {
  eventType: string
  calLink: string
  reason: string
  prefillName?: string
  prefillPhone?: string
  prefillNotes?: string
}
