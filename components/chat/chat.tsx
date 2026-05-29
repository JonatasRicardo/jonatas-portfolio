"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowUp, Trash2 } from "lucide-react";

import type { ChatContext } from "app/api/chat/types";
import { Textarea } from "components/base-ui/textarea";

import { BookingWidget } from "./booking-widget";
import { ChatMessageBlock } from "./chat-message-block";
import { Typing } from "./typing";

const DEFAULT_PLACEHOLDER = "Hi, I'm Jonatas. What do you want to ask me?";

export interface ChatProps {
  context?: ChatContext;
  placeholder?: string;
  whatsappFallbackUrl?: string;
}

function renderMessagePart(
  part: UIMessage["parts"][number],
  index: number,
  whatsappFallbackUrl?: string,
) {
  if (part.type === "text") {
    return (
      <p className="text-sm whitespace-pre-wrap" key={`text-${index}`}>
        {part.text}
      </p>
    );
  }

  if (part.type === "tool-showBookingWidget") {
    if (part.state === "output-available") {
      return (
        <BookingWidget
          key={`booking-${index}`}
          whatsappUrl={whatsappFallbackUrl}
          {...part.output}
        />
      );
    }

    return <Typing key={`booking-loading-${index}`} size="small" />;
  }

  return null;
}

export default function Chat({
  context = "portfolio",
  placeholder = DEFAULT_PLACEHOLDER,
  whatsappFallbackUrl,
}: ChatProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { context },
      }),
    [context],
  );

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      handleSubmit(event);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  return (
    <>
      {messages.map((message) => (
        <ChatMessageBlock key={message.id} role={message.role === "user" ? "user" : "assistant"}>
          <div className="space-y-4">
            {message.parts.map((part, index) =>
              renderMessagePart(part, index, whatsappFallbackUrl),
            )}
          </div>
        </ChatMessageBlock>
      ))}

      {status === "submitted" && (
        <ChatMessageBlock role="loading">
          <Typing size="small" />
        </ChatMessageBlock>
      )}

      <ChatMessageBlock role="form">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            placeholder={placeholder}
            className="flex-1 min-h-[60px] p-0 resize-none bg-transparent border-0"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={status !== "ready"}
          />
          <div className="flex space-x-2">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearMessages}
                className="self-center w-10 h-10 hover:bg-destructive/10 flex items-center justify-center bg-destructive/5 rounded-full transition-colors duration-300"
                title="Limpar mensagens"
              >
                <Trash2 className="w-5 h-5 text-destructive" />
              </button>
            )}
            <button
              type="submit"
              disabled={status !== "ready" || !input.trim()}
              className="self-center w-10 h-10 enabled:hover:bg-accent flex items-center justify-center bg-primary/10  rounded-full transition-colors duration-300"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          </div>
        </form>
      </ChatMessageBlock>

      <div ref={messagesEndRef} />
    </>
  );
}
