import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from "ai";

import { askJonatas } from "./jonatas-assistant";
import { consultoriaSystemPrompt } from "./prompts/consultoria";
import { bookingTools } from "./tools/booking";
import type { ChatContext } from "./types";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type ExtractedConsultoriaProfile = {
  name?: string;
  whatsapp?: string;
};

const PHONE_MIN_DIGITS = 9;

const getMessageText = (message: UIMessage): string => {
  if (typeof message.content === "string") {
    return message.content.trim();
  }

  if (Array.isArray(message.parts)) {
    return message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .filter(Boolean)
      .join(" ")
      .trim();
  }

  return "";
};

const normalizeWhatsapp = (raw: string): string => {
  const onlyDigits = raw.replace(/\D/g, "");
  return onlyDigits.length >= PHONE_MIN_DIGITS ? onlyDigits : "";
};

const getWhatsAppFromText = (text: string): string => {
  const matches = text.match(/(?:\+?\d[\d\s().-]{8,}\d)/g);
  if (!matches) {
    return "";
  }

  const normalizedMatches = matches
    .map((match) => normalizeWhatsapp(match))
    .filter(Boolean);

  return normalizedMatches.at(-1) ?? "";
};

const getNameFromText = (text: string): string => {
  const explicitMatch = text.match(
    /(?:meu nome(?: completo)?|me chamo|sou|chamo[- ]?me|nome is|name is)\s*:?[\s\-:]*([^\n.,!?:;]{2,80})/i,
  );
  if (explicitMatch?.[1]) {
    return explicitMatch[1].trim().replace(/["“”']/g, "").slice(0, 80).trim();
  }

  const hasWhatsappLike = /\+?\d[\d\s().-]{8,}\d/.test(text);
  if (!hasWhatsappLike) {
    return "";
  }

  const tokens = text
    .replace(/\d/g, " ")
    .replace(/[^\p{L}\s'-]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1)
    .map((token) => token.trim());

  if (tokens.length > 0 && tokens.length <= 3) {
    return tokens.join(" ");
  }

  return "";
};

const extractConsultoriaProfile = (messages: UIMessage[]): ExtractedConsultoriaProfile => {
  let name = "";
  let whatsapp = "";

  for (const message of messages) {
    if (message.role !== "user") {
      continue;
    }

    const text = getMessageText(message);
    if (!text) {
      continue;
    }

    const whatsappCandidate = getWhatsAppFromText(text);
    if (whatsappCandidate) {
      whatsapp = whatsappCandidate;
    }

    const nameCandidate = getNameFromText(text);
    if (nameCandidate) {
      name = nameCandidate;
    }
  }

  return {
    ...(name ? { name } : {}),
    ...(whatsapp ? { whatsapp } : {}),
  };
};

const buildConsultoriaSystemPrompt = (basePrompt: string, messages: UIMessage[]) => {
  const profile = extractConsultoriaProfile(messages);

  if (!profile.name && !profile.whatsapp) {
    return basePrompt;
  }

  const extraContext = [
    "\n\nKnown lead details already informed by the user:",
    profile.name ? `- Name: ${profile.name}` : null,
    profile.whatsapp ? `- WhatsApp: ${profile.whatsapp}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `${basePrompt}${extraContext}`;
};

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
      ? buildConsultoriaSystemPrompt(consultoriaSystemPrompt, messages)
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
