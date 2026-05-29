import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from "ai";

import { askJonatas } from "./jonatas-assistant";
import { consultoriaSystemPrompt } from "./prompts/consultoria";
import { bookingTools } from "./tools/booking";
import type { ChatContext } from "./types";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const body = (await req.json()) as { messages: UIMessage[]; context?: ChatContext };
  const { messages, context = "portfolio" } = body;

  const modelMessages = convertToModelMessages(messages);
  const lastMessage = String(modelMessages.at(-1)?.content ?? "");

  const system =
    context === "consultoria"
      ? consultoriaSystemPrompt
      : (await askJonatas(lastMessage)).prompt;

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    system,
    messages: convertToModelMessages(messages),
    ...(context === "consultoria"
      ? {
          tools: bookingTools,
          stopWhen: stepCountIs(5),
        }
      : {}),
  });

  return result.toUIMessageStreamResponse();
}
