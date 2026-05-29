"use client";

import { usePathname } from "next/navigation";
import React from "react";

import Template from "./index";

const CONSULTORIA_PATH = "/consultoria-web";

interface PagesLayoutProps {
  children: React.ReactNode;
}

export function PagesLayout({ children }: PagesLayoutProps) {
  const pathname = usePathname();

  if (pathname === CONSULTORIA_PATH || pathname.startsWith(`${CONSULTORIA_PATH}/`)) {
    return children;
  }

  return <Template>{children}</Template>;
}
