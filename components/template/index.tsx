"use client";

import React from "react";

import Chat from "components/chat";
import Sidebar from "components/sidebar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex transition-all duration-500">
          <Sidebar />

          <main className="flex-1 lg:w-3/4 min-w-0 overflow-hidden">{children}</main>
        </div>

        <Chat />
      </div>
    </div>
  );
}
