import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(() => ({} as any)),
}))

vi.mock('ai', () => ({
  convertToModelMessages: vi.fn((m: any) => m),
  streamText: vi.fn(() => ({
    toUIMessageStreamResponse: vi.fn().mockResolvedValue(new Response('ok')),
  })),
}))

import { streamText } from 'ai'
import { POST } from './route'

vi.mock('./jonatas-assistant', () => ({
  askJonatas: vi.fn(async () => ({ prompt: 'sys', sources: [] })),
}))

// Helpers
function createRequest(body: unknown) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('api/chat POST', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('streams a UIMessage response using ai SDK', async () => {
    const req = createRequest({ messages: [{ id: '1', role: 'user', content: 'Hi' }] })
    const res = await POST(req)

    expect(streamText).toHaveBeenCalled()
    expect(res).toBeInstanceOf(Response)
  })
})


