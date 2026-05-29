"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
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

export interface ChatHandle {
  startConversation: (message: string) => void;
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

const Chat = forwardRef<ChatHandle, ChatProps>(function Chat(
  {
    context = "portfolio",
    placeholder = DEFAULT_PLACEHOLDER,
    whatsappFallbackUrl,
  },
  ref,
) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);

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

  const scrollToChat = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useImperativeHandle(
    ref,
    () => ({
      startConversation: (message: string) => {
        scrollToChat();

        if (status === "ready") {
          sendMessage({ text: message });
          return;
        }

        pendingMessageRef.current = message;
      },
    }),
    [sendMessage, status],
  );

  useEffect(() => {
    if (status !== "ready" || !pendingMessageRef.current) {
      return;
    }

    const message = pendingMessageRef.current;
    pendingMessageRef.current = null;
    sendMessage({ text: message });
  }, [sendMessage, status]);

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
    <div ref={containerRef} id="consultoria-chat" className="w-full">
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
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea
            placeholder={placeholder}
            className="min-h-[60px] w-full min-w-0 flex-1 resize-none border-0 bg-transparent p-0"
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
    </div>
  );
});

export default Chat;
