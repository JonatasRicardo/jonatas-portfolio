"use client"

import React from 'react';
import { motion } from 'motion/react';
import { SocialLinks } from '../src/components/SocialLinks';
import { ProfileAvatar } from '../src/components/ProfileAvatar';
import Link from 'next/link';
import { ArrowRight, FileText, Briefcase } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex transition-all duration-500">
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-16 md:w-1/4"
          >
            <div className="sticky top-[2rem] z-10">
              <div className="relative">
                <ProfileAvatar size="small" className="mt-[.25rem] w-sidebar md:h-32 lg:h-48 xl:h-64 lg:ring-4" />
                
                <div id="triangle" className="absolute right-[10px] md:right-[23px] top-1/2 mt-[-12px] md:mt-[-24px]">
                  <div className="absolute ml-[-1px] w-0 h-0 border-t-[12px] md:border-t-[24px] border-t-transparent border-r-[12px] md:border-r-[24px] border-r-border border-b-[12px] md:border-b-[24px] border-b-transparent" />
                  <div className="absolute w-0 h-0 border-t-[12px] md:border-t-[24px] border-t-transparent border-r-[12px] md:border-r-[24px] border-r-card border-b-[12px] md:border-b-[24px] border-b-transparent" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="hidden lg:block text-center w-sidebar mt-6 mb-2"
              >
                <h1 className="text-xl">Jonatas Ricardo S. Santos</h1>
                <h2 className="text-base">Fullstack Software Engineer</h2>
              </motion.div>

              <SocialLinks />
            </div>
          </motion.aside>

          <main className="flex-1 lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative bg-card border border-border rounded-xl shadow-lg p-6 space-y-6"
            >
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
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}