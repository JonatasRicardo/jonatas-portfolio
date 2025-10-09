"use client"

import React from 'react';
import { motion } from 'motion/react';
import { ExperienceCard } from '@/src/components/experience-card';
import { EducationCard } from '@/src/components/education-card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

export default function ResumePage() {
    return (
        <>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-4 pb-6 border-b border-border"
            >
                <Link
                    href="/"
                    className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Resume & Experience</h1>
                    <p className="text-muted-foreground">My professional journey and education</p>
                </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-6"
            >
                <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
                {experiences.map((experience, index) => (
                    <ExperienceCard
                        key={experience.id}
                        title={experience.title}
                        company={experience.company}
                        period={experience.period}
                        description={experience.description}
                        delay={index * 0.1}
                    />
                ))}
            </motion.div>

            {/* Education Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-6"
            >
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                {education.map((edu, index) => (
                    <EducationCard
                        key={edu.id}
                        degree={edu.degree}
                        institution={edu.institution}
                        period={edu.period}
                        description={edu.description}
                        delay={index * 0.1}
                    />
                ))}
            </motion.div>
        </>
    );
}