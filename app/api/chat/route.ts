import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { askJonatas } from './jonatas-assistant';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const body = (await req.json()) as { messages: UIMessage[] };
  const { messages } = body;

  const modelMessages = convertToModelMessages(messages);
  const lastMessage = String(modelMessages.at(-1)?.content ?? "");

  const { prompt } = await askJonatas(lastMessage);

  const result = streamText({
    model: openai('gpt-4.1-mini'),
    system: prompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
