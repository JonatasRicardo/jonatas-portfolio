'use client'

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { Post } from 'app/interfaces/post';

interface ArticlesPreviewProps {
  articles: Post[];
}

export function ArticlesPreview({ articles }: ArticlesPreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-8"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Últimos Artigos</h3>
        <p className="text-muted-foreground">Confira meus artigos mais recentes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(0, 5).map((article, index) => (
          <Link href={`/posts/${article.slug}`} key={article.slug}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-32 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(article.date)}</span>
                </div>
                
                <h4 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-6 text-center"
      >
        <Link href="/posts">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <span className="text-sm font-medium">Ver todos os artigos</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
