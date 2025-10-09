import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, FileText, Briefcase } from 'lucide-react';
import { ArticlesPreview } from '@/components/articles-preview';
import { getAllPosts } from '@/lib/api';
import Content from '@/components/content';

export default function HomePage() {
  const articles = getAllPosts();

  return (
    <>
      {/* Presentation Area */}
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pb-6 border-b border-border"
      >
        <p className="mb-5 text-accent-foreground leading-relaxed">
          Hi, my name is <strong itemProp="givenName" className="text-foreground">Jônatas Ricardo Santos</strong>, a Senior Frontend Engineer with over <span aria-label="15 years of experience" className="text-foreground">15+ years</span> of experience building 
          high-performance web applications. My work blends modern frontend technologies 
          (<strong>React, Next.js, TypeScript, GraphQL</strong>) with a growing focus on <strong>AI and Machine Learning</strong> to ship scalable, user-centric products.
        </p>

        <p className="text-accent-foreground leading-relaxed">
          Here I share <strong>projects</strong>, <strong>articles</strong>, and <strong>practical insights</strong> on how solid engineering practices, documentation, 
          and design systems accelerate delivery and empower teams.
          I’m passionate about <em>bridging code, creativity, and intelligence</em> — helping 
          products evolve faster and developers learn smarter.
        </p>


      </Content>

      {/* Navigation Cards */}
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex gap-4"
      >
        <Link href="/posts">
          <div className="group flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border hover:shadow-md transition-all duration-300">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Articles</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </Link>

        <Link href="/resume">
          <div className="group flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border hover:shadow-md transition-all duration-300">
            <Briefcase className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Resume</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </Link>
      </Content>

      {/* Articles Preview Section */}
      {articles.length > 0 && (
        <ArticlesPreview articles={articles} />
      )}
    </>
  );
}