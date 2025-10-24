import React from 'react';

import { ArticlesPreview } from 'components/articles/articles-preview';
import Content from 'components/content';
import { ResumePreview } from 'components/resume/resume-preview';
import { getAllPosts } from 'lib/api';

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
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Articles Preview */}
        {articles.length > 0 && (
          <ArticlesPreview articles={articles} />
        )}
        
        {/* Resume Preview */}
        <ResumePreview />
      </div>

    </>
  );
}