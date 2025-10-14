import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Briefcase } from 'lucide-react';
import { ArticlesPreview } from 'app/components/articles-preview';

import { getAllPosts } from 'app/lib/api';
import Content from 'app/components/content';
import { ResumePreview } from '@/components/resume/resume-preview';

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
          Hi, my name is <strong itemProp="givenName" className="text-foreground">Jônatas Ricardo Santos</strong>, a Senior Fullstack Engineer with over <span aria-label="15 years of experience" className="text-foreground">15+ years</span> of experience, specializing in <strong>frontend development</strong> and currently expanding my expertise into <strong>AI and Machine Learning</strong>. I build high-performance, user-centric web applications using modern technologies like <strong>React, Next.js, TypeScript, and GraphQL</strong>.
        </p>

        <p className="text-accent-foreground leading-relaxed">
          Here I share <strong>projects</strong>, <strong>articles</strong>, and <strong>practical insights</strong> on frontend architecture, design systems, and how AI/ML is transforming the development landscape. I'm passionate about <em>bridging beautiful interfaces with intelligent functionality</em> — creating products that are both delightful to use and powered by cutting-edge technology.
        </p>

      </Content>

      {/* Articles and Resume Preview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Articles Preview */}
        {articles.length > 0 && (
          <ArticlesPreview articles={articles} />
        )}
        
        {/* Resume Preview */}
        <ResumePreview />
      </div>

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
    </>
  );
}