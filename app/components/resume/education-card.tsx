import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

interface EducationCardProps {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  delay?: number;
  preview?: boolean;
}

export function EducationCard({ degree, preview, institution, period, description, delay = 0 }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative pl-8 border-l-2 border-accent-foreground/30 last:pb-0"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent-foreground border-4 border-background"
      />
      <div className="flex items-start gap-3 mb-2">
        <div className="p-2 rounded-lg bg-accent text-accent-foreground">
          <GraduationCap className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="mb-1">{degree}</h4>
          <p className="text-muted-foreground">{institution}</p>
        </div>
      </div>
      <p className="text-muted-foreground mb-2">{period}</p>
      {description && !preview && <p className="text-muted-foreground">{description}</p>}
    </motion.div>
  );
}
