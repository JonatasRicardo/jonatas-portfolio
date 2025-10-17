'use client'

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail, Phone, PhoneForwarded, FileText, Check } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../base-ui/tooltip';

export function SocialLinks() {
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
      copyToClipboard('jonatasricardo90@gmail.com', 'email');
    }
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    // Only prevent default and copy on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
      e.preventDefault();
      copyToClipboard('+5521980484957', 'phone');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="sticky w-sidebar mt-4 flex gap-2 flex-col lg:flex-row justify-between items-center"
    >
      <motion.a
        href="https://www.linkedin.com/in/jonatasricardo/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
      >
        <Linkedin className="w-5 h-5 text-primary" />
      </motion.a>

      <motion.a
        href="https://github.com/JonatasRicardo"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
      >
        <Github className="w-5 h-5 text-primary" />
      </motion.a>

      <motion.a
        href="/JonatasSantos-Resume.pdf"
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
              href="mailto:jonatasricardo90@gmail.com"
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
              Click to copy: jonatasricardo90@gmail.com
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
              href="tel:+5521980484957"
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
            <p>Click to copy: +55 21 9804 84957</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </motion.div>
  );
}