"use client"

import { ArrowRight, Calendar } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import React from "react"
import { ImageWithFallback } from "components/base-ui/ImageWithFallback"
import { Post } from "interfaces/post"

interface ArticlesPreviewLabels {
  title: string
  viewAll: string
}

interface ArticlesPreviewProps {
  articles: Post[]
  dateLocale?: string
  labels?: ArticlesPreviewLabels
}

const defaultLabels: ArticlesPreviewLabels = {
  title: "Articles",
  viewAll: "View All",
}

export function ArticlesPreview({ articles, dateLocale = "pt-BR", labels = defaultLabels }: ArticlesPreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(dateLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{labels.title}</h2>

        <Link
          href="/posts"
          className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-300"
        >
          {labels.viewAll}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.slice(0, 4).map((article, index) => (
          <Link href={`/posts/${article.slug}`} key={article.slug}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              className="group bg-card border-border relative overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-32 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-4">
                <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(article.date)}</span>
                </div>

                <h4 className="group-hover:text-primary mb-2 line-clamp-2 text-sm font-medium transition-colors">
                  {article.title}
                </h4>

                <p className="text-muted-foreground line-clamp-2 text-xs">{article.description || article.excerpt}</p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
