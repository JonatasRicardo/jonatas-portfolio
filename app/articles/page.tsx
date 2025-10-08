"use client"

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PortfolioFilter } from '@/src/components/PortfolioFilter';

export default function ArticlesPage() {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center gap-4 pb-6 border-b border-border"
      >
        <Link
          href="/"
          className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Articles & Portfolio</h1>
          <p className="text-muted-foreground">Explore my latest work and projects</p>
        </div>
      </motion.div>

      <PortfolioFilter />
    </>
  );
}