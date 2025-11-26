'use client'

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import React from 'react';
import { PortfolioCard } from './portfolio-card';

type PortfolioItem = {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    category: string;
}

export function PortfolioFilter({
    portfolioItems
}: { portfolioItems: PortfolioItem[] }) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {portfolioItems?.map((item, index) => (
            <Link href={`/posts/${item.slug}`} key={item.id}>
                <PortfolioCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    category={item.category}
                    delay={index * 0.1}
                />
            </Link>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}