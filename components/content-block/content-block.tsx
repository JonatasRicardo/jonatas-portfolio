"use client";

import { HTMLMotionProps, motion } from "motion/react";

import { cn } from "components/base-ui/cn";

export interface ContentBlockProps extends HTMLMotionProps<"div"> {
  isFirst?: boolean;
  delay?: number;
}

export function ContentBlock({
  children,
  className,
  isFirst = false,
  delay,
  transition,
  ...props
}: ContentBlockProps) {
  return (
    <motion.div
      initial={isFirst ? { opacity: 0, x: 30 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={
        transition ?? {
          duration: 0.6,
          delay: delay ?? (isFirst ? 0.5 : 0.6),
        }
      }
      className={cn(
        "relative bg-card border border-border rounded-xl shadow-lg p-6 space-y-6",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
