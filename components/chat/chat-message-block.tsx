"use client";

import React from "react";
import { motion } from "motion/react";
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
  const hideAvatar = resolvedRole === "form" || resolvedRole === "user" || resolvedRole === "loading";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="mt-6 flex"
    >
      <ChatSystemAvatar hide={hideAvatar} />
      <div className="flex-1 lg:w-3/4">
        <div className={`${TALK_BOX_STYLES[resolvedRole]}  border border-border rounded-xl shadow-lg p-6 space-y-6`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
