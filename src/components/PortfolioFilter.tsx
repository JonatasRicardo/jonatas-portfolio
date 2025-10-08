
'use client'

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioCard } from './PortfolioCard';

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

export function PortfolioFilter() {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {portfolioItems.map((item, index) => (
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
  );
}