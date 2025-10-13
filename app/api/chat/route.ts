import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { systemPrompt } from './prompt';
import { askJonatas } from './jonatas-assistant';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  console.log({
    messages,
    msg: JSON.stringify(convertToModelMessages(messages))
  })

  const modelMessages = convertToModelMessages(messages);

  const lastMessage =  String(modelMessages[modelMessages.length - 1].content);

  const { prompt, sources } = await askJonatas(lastMessage);

  const result = streamText({
    model: openai('gpt-5-nano'),
    system: prompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}