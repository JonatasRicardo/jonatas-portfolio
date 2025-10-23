"use client"

import React from 'react';
import { motion } from 'motion/react';

import Sidebar from '@/components/sidebar';
import Chat from '@/components/chat';

export default function Template({
  children
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex transition-all duration-500">
          <Sidebar />

          <main className="flex-1 lg:w-3/4 min-w-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative bg-card border border-border rounded-xl shadow-lg p-6 space-y-6"
            >
              {children}
            </motion.div>
          </main>
        </div>
        <Chat />
      </div>
    </div>
  );
}