import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-3.5-turbo'),
    system: 'Você é um assistente útil e prestativo.',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}