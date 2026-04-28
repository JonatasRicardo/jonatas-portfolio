"use client";

import { motion } from "motion/react";
import { ProfileAvatar } from "components/profile-avatar";

interface ChatSystemAvatarProps {
  hide?: boolean;
}

export function ChatSystemAvatar({ hide = false }: ChatSystemAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="w-16 md:w-1/4"
    >
      <div className="sticky top-[2rem] z-10">
        {!hide && (
          <div className="relative flex justify-end pr-4">
            <ProfileAvatar size="small" className="mt-[.25rem]" />

            <div className="absolute right-[10px] top-1/2 mt-[-12px] ">
              <div className="absolute ml-[-1px] w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px]  border-r-border border-b-[12px] border-b-transparent" />
              <div className="absolute w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px]  border-r-card border-b-[12px] border-b-transparent" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
