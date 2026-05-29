import { cn } from "components/base-ui/cn";

interface ContentStackProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentStack({ children, className }: ContentStackProps) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
}
