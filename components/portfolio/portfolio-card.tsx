import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../base-ui/ImageWithFallback';

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  delay?: number;
}

export function PortfolioCard({ title, description, image, category, delay = 0 }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary">
          {category}
        </div>
        <h3 className="mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
