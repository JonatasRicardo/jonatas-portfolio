import React from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  delay?: number;
  preview?: boolean
}

export function ExperienceCard({ title, preview,  company, period, description, delay = 0 }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative pl-8 border-l-2 border-primary/30 last:pb-0"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"
      />
      <div className="flex items-start gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Briefcase className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="mb-1">{title}</h4>
          <p className="text-muted-foreground">{company}</p>
        </div>
      </div>
      <p className="text-muted-foreground mb-2">{period}</p>
      {!preview && <p className="text-muted-foreground">{description}</p>}
    </motion.div>
  );
}
