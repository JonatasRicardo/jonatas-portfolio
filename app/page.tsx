'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioCard } from '../src/components/PortfolioCard';
import { ExperienceCard } from '../src/components/ExperienceCard';
import { EducationCard } from '../src/components/EducationCard';
import { ImageWithFallback } from '../src/components/ui/ImageWithFallback';
import { Github, Linkedin, Twitter, Mail, Phone, PhoneForwarded, FileText, Check } from 'lucide-react';
import { ProfileAvatar } from '../src/components/ProfileAvatar';
import { Tooltip, TooltipTrigger, TooltipContent } from '../src/components/ui/tooltip';

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
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      
      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    // Only prevent default and copy on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
      e.preventDefault();
      copyToClipboard('jonatas@example.com', 'email');
    }
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    // Only prevent default and copy on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
      e.preventDefault();
      copyToClipboard('+5511999999999', 'phone');
    }
  };

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

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

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="sticky w-sidebar mt-4 flex gap-2 flex-col lg:flex-row justify-between items-center"
              >
                  <motion.a
                    href="https://linkedin.com/in/jonatassantos"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                  </motion.a>

                  <motion.a
                    href="https://github.com/jonatassantos"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
                  >
                    <Github className="w-5 h-5 text-primary" />
                  </motion.a>

                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
                  >
                    <FileText className="w-5 h-5 text-primary" />
                  </motion.a>
                

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.a
                          href="mailto:jonatas@example.com"
                          onClick={handleEmailClick}
                          className="block p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300 cursor-pointer"
                        >
                          {copiedItem === 'email' ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Mail className="w-5 h-5 text-primary" />
                          )}
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Click to copy: jonatas@example.com
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.a
                          href="tel:+5511999999999"
                          onClick={handlePhoneClick}
                          className="block p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300 cursor-pointer"
                        >
                          {copiedItem === 'phone' ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Phone className="w-5 h-5 text-primary" />
                          )}
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to copy: +5511999999999</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                
              </motion.div>
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

              {/* Filter Buttons */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex justify-center gap-3 flex-wrap"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === category
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
          </main>
        </div>
      </div>
    </div>
  );
}
