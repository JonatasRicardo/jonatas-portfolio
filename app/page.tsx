'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioCard } from '../src/components/PortfolioCard';
import { ExperienceCard } from '../src/components/ExperienceCard';
import { EducationCard } from '../src/components/EducationCard';
import { ImageWithFallback } from '../src/components/ui/ImageWithFallback';
import { Github, Linkedin, Twitter } from 'lucide-react';

const categories = ['All', 'Design', 'Development'];

const experiences = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Leading the development of modern web applications using React, TypeScript, and cutting-edge technologies.',
  },
  {
    id: 2,
    title: 'UI/UX Designer & Developer',
    company: 'Creative Digital Studio',
    period: '2020 - 2022',
    description: 'Designed and developed user-centric digital experiences for various clients across multiple industries.',
  },
  {
    id: 3,
    title: 'Junior Web Developer',
    company: 'StartUp Ventures',
    period: '2018 - 2020',
    description: 'Contributed to building responsive web applications and collaborated with design teams.',
  },
];

const education = [
  {
    id: 1,
    degree: 'Master of Computer Science',
    institution: 'University of Technology',
    period: '2016 - 2018',
    description: 'Specialized in Human-Computer Interaction and Web Technologies',
  },
  {
    id: 2,
    degree: 'Bachelor of Design',
    institution: 'School of Digital Arts',
    period: '2012 - 2016',
    description: 'Focus on Visual Communication and Interactive Media',
  },
];

const portfolioItems = [
  {
    id: 1,
    title: 'Modern Web Platform',
    description: 'A sleek and responsive web application with cutting-edge design',
    image: 'https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzU5NDA2OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral',
    category: 'Design',
  },
  {
    id: 2,
    title: 'Creative Portfolio System',
    description: 'Interactive portfolio showcase with smooth animations',
    image: 'https://images.unsplash.com/photo-1583121182724-6f84970c0e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpb3xlbnwxfHx8fDE3NTk0NTY3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral',
    category: 'Design',
  },
  {
    id: 3,
    title: 'Mobile App Interface',
    description: 'Intuitive mobile application with seamless user experience',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzU5Mzg5MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral',
    category: 'Design',
  },
  {
    id: 4,
    title: 'Brand Identity System',
    description: 'Comprehensive branding and visual identity design',
    image: 'https://images.unsplash.com/photo-1633533448522-26ee3eab7961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc1OTM0OTkxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral',
    category: 'Design',
  },
  {
    id: 5,
    title: 'Full Stack Application',
    description: 'End-to-end web application with modern tech stack',
    image: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NTk0MDQ3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral',
    category: 'Development',
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    description: 'Scalable online shopping experience with advanced features',
    image: 'https://images.unsplash.com/photo-1746221331496-a87689fc8eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc1OTQ0Nzc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral',
    category: 'Development',
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar, Social Links, Experience & Education (Fixed/Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Avatar & Social Links - Desktop: Vertical, Mobile: Horizontal */}
              <header className="flex lg:flex-col flex-row items-center lg:text-center gap-4 lg:gap-0">
                {/* Avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:mb-6"
                >
                  <div className="relative w-32 h-32 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc1OTQxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral"
                      alt="Profile Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex gap-2 lg:gap-4"
                >
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 lg:p-3 rounded-full bg-card border border-border hover:bg-accent transition-colors"
                  >
                    <Github className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 lg:p-3 rounded-full bg-card border border-border hover:bg-accent transition-colors"
                  >
                    <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 lg:p-3 rounded-full bg-card border border-border hover:bg-accent transition-colors"
                  >
                    <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                </motion.div>
              </header>

              {/* Experience Section - Hidden on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="hidden lg:block"
              >
                <h2 className="mb-6">Experience</h2>
                <div>
                  <ExperienceCard
                    title={experiences[0].title}
                    company={experiences[0].company}
                    period={experiences[0].period}
                    description={experiences[0].description}
                    delay={0.7}
                  />
                </div>
              </motion.div>

              {/* Education Section - Hidden on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="hidden lg:block"
              >
                <h2 className="mb-6">Education</h2>
                <div>
                  <EducationCard
                    degree={education[0].degree}
                    institution={education[0].institution}
                    period={education[0].period}
                    description={education[0].description}
                    delay={0.9}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Filters & Portfolio Grid (Scrollable) */}
          <div className="lg:col-span-2">

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative bg-card border border-border rounded-xl shadow-lg p-6 lg:p-8 space-y-6 lg:space-y-8"
            >
            {/* Sticky Triangle for Desktop */}
            <div className="hidden lg:block sticky ml-[-2.7rem] top-[2rem]
            \z-10">
              <div className="absolute left-0 top-0 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-card border-b-[12px] border-b-transparent" />
              <div className="absolute left-[-1px] top-0 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-border border-b-[12px] border-b-transparent" />
            </div>

              {/* Mobile Triangle - Points Upward */}
              <div className="lg:hidden sticky left-4 top-[-1px] \z-10">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-card border-r-[12px] border-r-transparent" />
                <div className="mt-[1px] left-4 top-[-2px] w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-border border-r-[12px] border-r-transparent" />
              </div>
              {/* Presentation Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pb-6 lg:pb-8 border-b border-border"
              >
                <p className="text-muted-foreground leading-relaxed">
                  Hi, my name is <span className="text-foreground">Jonatas Santos</span> and I'm a{' '}
                  <span className="text-foreground">Frontend Developer</span> specializing in crafting beautiful, 
                  responsive web experiences with modern technologies. I'm passionate about creating intuitive user 
                  interfaces and bringing creative designs to life with clean, efficient code.
                </p>
              </motion.div>

              {/* Filter Buttons */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex justify-center lg:justify-start gap-3 lg:gap-4 flex-wrap"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'bg-background text-foreground hover:bg-accent border border-border'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>

              {/* Portfolio Grid */}
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <PortfolioCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      category={item.category}
                      delay={index * 0.1}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
