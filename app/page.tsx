"use client"
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, FileText, Briefcase } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Presentation Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pb-6 border-b border-border"
      >
        <p className="text-muted-foreground leading-relaxed">
          Hi, my name is <span className="text-foreground">Jonatas Santos</span> and I'm a{' '}
          <span className="text-foreground">Frontend Developer</span> specializing in crafting beautiful,
          responsive web experiences with modern technologies. I'm passionate about creating intuitive user
          interfaces and bringing creative designs to life with clean, efficient code.
        </p>
      </motion.div>

      {/* Navigation Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Link href="/articles">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Articles & Portfolio</h3>
                <p className="text-muted-foreground">Explore my work and projects</p>
              </div>
            </div>
            <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
              <span className="text-sm font-medium">View Articles</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </motion.div>
        </Link>

        <Link href="/resume">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Resume & Experience</h3>
                <p className="text-muted-foreground">My professional journey</p>
              </div>
            </div>
            <div className="flex items-center text-accent group-hover:translate-x-2 transition-transform duration-300">
              <span className="text-sm font-medium">View Resume</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
}