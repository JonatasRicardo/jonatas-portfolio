import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { askJonatas } from './jonatas-assistant';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const modelMessages = convertToModelMessages(messages);

  const lastMessage =  String(modelMessages[modelMessages.length - 1].content);

  const { prompt } = await askJonatas(lastMessage);

  const result = streamText({
    model: openai('gpt-4.1-mini'),
    system: prompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}