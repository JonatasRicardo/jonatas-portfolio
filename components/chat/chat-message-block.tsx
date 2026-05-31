"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "components/base-ui/cn";
import { ChatSystemAvatar } from "./chat-system-avatar";

export type ChatMessageRole = "user" | "system" | "assistant" | "form" | "loading";
export type ChatMessageVariant = "portfolio" | "consultoria";

interface ChatMessageBlockProps {
  children: React.ReactNode;
  role?: ChatMessageRole;
  variant?: ChatMessageVariant;
}

const TALK_BOX_STYLES: Record<ChatMessageRole, string> = {
  assistant: "float-left bg-card",
  system: "float-left bg-card",
  user: "float-right bg-accent",
  loading: "float-left bg-card",
  form: "bg-card",
};

export function ChatMessageBlock({ children, role, variant = "portfolio" }: ChatMessageBlockProps) {
  const resolvedRole = role ?? "assistant";
  const isForm = resolvedRole === "form";
  const isConsultoria = variant === "consultoria";
  const hideAvatar = isForm || resolvedRole === "user" || resolvedRole === "loading";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className={cn("mt-6 flex", isConsultoria && "w-full", isConsultoria && isForm && "mt-4 lg:mt-6")}
    >
      {(!isConsultoria || !isForm) && <ChatSystemAvatar hide={hideAvatar} variant={variant} />}
      <div
        className={cn(
          isConsultoria ? "min-w-0" : "flex-1 lg:w-3/4",
          isConsultoria && (isForm ? "w-full px-0" : "flex-1 lg:w-3/4")
        )}
      >
        <div
          className={cn(
            TALK_BOX_STYLES[resolvedRole],
            "border-border space-y-6 rounded-xl border p-6 shadow-lg",
            isConsultoria && isForm && "px-4 py-4 lg:p-6"
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
