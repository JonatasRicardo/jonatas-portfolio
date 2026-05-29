import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@ai-sdk/openai", () => ({
  openai: vi.fn(() => ({} as never)),
}));

vi.mock("ai", () => ({
  convertToModelMessages: vi.fn((m: unknown) => m),
  stepCountIs: vi.fn((n: number) => ({ type: "stepCount", n })),
  streamText: vi.fn(() => ({
    toUIMessageStreamResponse: vi.fn().mockResolvedValue(new Response("ok")),
  })),
}));

import { stepCountIs, streamText } from "ai";

import { POST } from "./route";

vi.mock("./jonatas-assistant", () => ({
  askJonatas: vi.fn(async () => ({ prompt: "sys", sources: [] })),
}));

vi.mock("./tools/booking", () => ({
  bookingTools: {
    showBookingWidget: { description: "mock booking tool" },
  },
}));

function createRequest(body: unknown) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("api/chat POST", () => {
  const originalEnv = process.env.OPENAI_API_KEY;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENAI_API_KEY = "test-key";
  });

  afterEach(() => {
    process.env.OPENAI_API_KEY = originalEnv;
  });

  it("streams a UIMessage response using ai SDK", async () => {
    const req = createRequest({ messages: [{ id: "1", role: "user", content: "Hi" }] });
    const res = await POST(req);

    expect(streamText).toHaveBeenCalled();
    expect(res).toBeInstanceOf(Response);
  });

  it("includes booking tools and stopWhen for consultoria context", async () => {
    const req = createRequest({
      context: "consultoria",
      messages: [{ id: "1", role: "user", parts: [{ type: "text", text: "Quero agendar" }] }],
    });

    await POST(req);

    expect(stepCountIs).toHaveBeenCalledWith(5);
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        tools: expect.objectContaining({
          showBookingWidget: expect.anything(),
        }),
        stopWhen: expect.objectContaining({ type: "stepCount", n: 5 }),
      }),
    );
  });

  it("does not include booking tools for portfolio context", async () => {
    const req = createRequest({
      context: "portfolio",
      messages: [{ id: "1", role: "user", parts: [{ type: "text", text: "Hi" }] }],
    });

    await POST(req);

    expect(streamText).toHaveBeenCalledWith(
      expect.not.objectContaining({
        tools: expect.anything(),
      }),
    );
  });
});
