"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "components/base-ui/cn";
import { ChatSystemAvatar } from "./chat-system-avatar";

export type ChatMessageRole = "user" | "system" | "assistant" | "form" | "loading";

interface ChatMessageBlockProps {
  children: React.ReactNode;
  role?: ChatMessageRole;
}

const TALK_BOX_STYLES: Record<ChatMessageRole, string> = {
  assistant: "float-left bg-card",
  system: "float-left bg-card",
  user: "float-right bg-accent",
  loading: "float-left bg-card",
  form: "bg-card",
};

export function ChatMessageBlock({ children, role }: ChatMessageBlockProps) {
  const resolvedRole = role ?? "assistant";
  const isForm = resolvedRole === "form";
  const hideAvatar = isForm || resolvedRole === "user" || resolvedRole === "loading";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className={cn("mt-6 flex w-full", isForm && "mt-4 lg:mt-6")}
    >
      {!isForm && <ChatSystemAvatar hide={hideAvatar} />}
      <div className={cn("min-w-0", isForm ? "w-full px-0" : "flex-1 lg:w-3/4")}>
        <div
          className={cn(
            TALK_BOX_STYLES[resolvedRole],
            "space-y-6 border border-border shadow-lg",
            isForm ? "rounded-xl px-4 py-4 lg:p-6" : "rounded-xl p-6",
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
