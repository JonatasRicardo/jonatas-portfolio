"use client";

import { motion } from "motion/react";
import { ProfileAvatar } from "components/profile-avatar";
import { cn } from "components/base-ui/cn";

import type { ChatMessageVariant } from "./chat-message-block";

interface ChatSystemAvatarProps {
  hide?: boolean;
  variant?: ChatMessageVariant;
}

export function ChatSystemAvatar({ hide = false, variant = "portfolio" }: ChatSystemAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={cn("w-16", variant === "portfolio" && "md:w-1/4")}
    >
      <div className="sticky top-[2rem] z-10">
        {!hide && (
          <div className="relative flex justify-end pr-4">
            <ProfileAvatar size="small" className="mt-[.25rem]" />

            <div className="absolute top-1/2 right-[10px] mt-[-12px]">
              <div className="border-r-border absolute ml-[-1px] h-0 w-0 border-t-[12px] border-r-[12px] border-b-[12px] border-t-transparent border-b-transparent" />
              <div className="border-r-card absolute h-0 w-0 border-t-[12px] border-r-[12px] border-b-[12px] border-t-transparent border-b-transparent" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
