"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowUp, Trash2 } from "lucide-react";

import type { ChatContext } from "app/api/chat/types";
import { cn } from "components/base-ui/cn";
import { Textarea } from "components/base-ui/textarea";

import { BookingWidget } from "./booking-widget";
import { ChatMessageBlock, type ChatMessageRole, type ChatMessageVariant } from "./chat-message-block";
import { Typing } from "./typing";

const DEFAULT_PLACEHOLDER = "Hi, I'm Jonatas. What do you want to ask me?";

type BookingWidgetPartOutput = {
  calLink: string;
  eventType: string;
  reason: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  prefillNotes?: string;
};

export interface ChatProps {
  context?: ChatContext;
  placeholder?: string;
  whatsappFallbackUrl?: string;
  variant?: ChatMessageVariant;
}

export interface ChatHandle {
  startConversation: (message: string) => void;
}

function isBookingWidgetPartOutput(output: unknown): output is BookingWidgetPartOutput {
  if (!output || typeof output !== "object") {
    return false;
  }

  const candidate = output as Record<string, unknown>;

  return (
    typeof candidate.calLink === "string" &&
    typeof candidate.eventType === "string" &&
    typeof candidate.reason === "string"
  );
}

function renderMessagePart(part: UIMessage["parts"][number], index: number, whatsappFallbackUrl?: string) {
  if (part.type === "text") {
    return (
      <p className="text-sm whitespace-pre-wrap" key={`text-${index}`}>
        {part.text}
      </p>
    );
  }

  if (part.type === "tool-showBookingWidget") {
    if (part.state === "output-available") {
      if (!isBookingWidgetPartOutput(part.output)) {
        return null;
      }

      return <BookingWidget key={`booking-${index}`} whatsappUrl={whatsappFallbackUrl} {...part.output} />;
    }

    return <Typing key={`booking-loading-${index}`} size="small" />;
  }

  return null;
}

function resolveMessageRole(role: UIMessage["role"]): ChatMessageRole {
  if (role === "user" || role === "system") {
    return role;
  }

  return "assistant";
}

const Chat = forwardRef<ChatHandle, ChatProps>(function Chat(
  { context = "portfolio", placeholder = DEFAULT_PLACEHOLDER, whatsappFallbackUrl, variant },
  ref
) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);
  const resolvedVariant = variant ?? (context === "consultoria" ? "consultoria" : "portfolio");
  const isConsultoria = resolvedVariant === "consultoria";

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { context },
      }),
    [context]
  );

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  });

  useImperativeHandle(
    ref,
    () => ({
      startConversation: (message: string) => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

        if (status === "ready") {
          sendMessage({ text: message });
          return;
        }

        pendingMessageRef.current = message;
      },
    }),
    [sendMessage, status]
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
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      id={isConsultoria ? "consultoria-chat" : undefined}
      className={cn(isConsultoria && "w-full")}
    >
      {messages.map((message) => (
        <ChatMessageBlock key={message.id} role={resolveMessageRole(message.role)} variant={resolvedVariant}>
          <div className="space-y-4">
            {message.parts.map((part, index) => renderMessagePart(part, index, whatsappFallbackUrl))}
          </div>
        </ChatMessageBlock>
      ))}

      {status === "submitted" && (
        <ChatMessageBlock role="loading" variant={resolvedVariant}>
          <Typing size="small" />
        </ChatMessageBlock>
      )}

      <ChatMessageBlock role="form" variant={resolvedVariant}>
        <form onSubmit={handleSubmit} className={cn("flex", isConsultoria ? "w-full gap-2" : "space-x-2")}>
          <Textarea
            placeholder={placeholder}
            className={cn(
              "min-h-[60px] flex-1 resize-none border-0 bg-transparent p-0",
              isConsultoria && "w-full min-w-0"
            )}
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
                className="hover:bg-destructive/10 bg-destructive/5 flex h-10 w-10 items-center justify-center self-center rounded-full transition-colors duration-300"
                title="Limpar mensagens"
              >
                <Trash2 className="text-destructive h-5 w-5" />
              </button>
            )}
            <button
              type="submit"
              disabled={status !== "ready" || !input.trim()}
              className="enabled:hover:bg-accent bg-primary/10 flex h-10 w-10 items-center justify-center self-center rounded-full transition-colors duration-300"
            >
              <ArrowUp className="h-6 w-6" />
            </button>
          </div>
        </form>
      </ChatMessageBlock>

      <div ref={messagesEndRef} />
    </div>
  );
});

export default Chat;
