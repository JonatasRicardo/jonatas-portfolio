"use client"

import React from 'react';
import { motion } from 'motion/react';
import { ExperienceCard } from '@/components/resume/experience-card';
import { EducationCard } from '@/components/resume/education-card';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react';
import { education, experiences } from './resume-data';

const latestExperience = experiences[0];
const latestEducation = education.slice(0, 2);

export function ResumePreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Resume Preview</h2>
                <Link 
                    href="/resume"
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                    View Full Resume
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

            {/* Latest Experience */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    Latest Experience
                </div>
                <ExperienceCard
                    title={latestExperience.title}
                    company={latestExperience.company}
                    period={latestExperience.period}
                    description={latestExperience.description}
                    delay={0}
                    preview
                />
            </div>

            {/* Latest Education */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    Recent Education
                </div>
                <div className="space-y-4">
                    {latestEducation.map((edu, index) => (
                        <EducationCard
                            key={edu.id}
                            degree={edu.degree}
                            institution={edu.institution}
                            period={edu.period}
                            description={edu.description}
                            delay={index * 0.1}
                            preview
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
