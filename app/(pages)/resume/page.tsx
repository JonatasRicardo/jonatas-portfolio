"use client"

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { EducationCard } from '@/components/resume/education-card';
import { ExperienceCard } from '@/components/resume/experience-card';
import { ArrowLeft, Download, Code, Database, Brain, Wrench, TestTube, Zap } from 'lucide-react';
import { Button } from '@/components/base-ui/button';
import { Badge } from '@/components/base-ui/badge';
import { education, experiences, skills } from '@/components/resume/resume-data';

export default function ResumePage() {
    return (
        <>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex md:items-center flex-col md:flex-row justify-between pb-6 border-b border-border"
            >
                <div className="flex items-center gap-4">
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
                </div>
                <Button
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/JonatasSantos-Resume.pdf';
                        link.download = 'JonatasSantos-Resume.pdf';
                        link.click();
                    }}
                    className="ml-4 mt-4 md:mt-0 flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </Button>
            </motion.div>

            {/* Experience Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
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
                transition={{ duration: 0.6, delay: 1.5 }}
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

            {/* Skills Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-6"
            >
                <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Frontend Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <Code className="w-5 h-5 text-blue-500" />
                            <h3 className="font-medium">Frontend</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.frontend.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Backend Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-green-500" />
                            <h3 className="font-medium">Backend</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.backend.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* AI/ML/Data Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <Brain className="w-5 h-5 text-purple-500" />
                            <h3 className="font-medium">AI/ML/Data</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.ai_ml_data.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* DevOps Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-orange-500" />
                            <h3 className="font-medium">DevOps</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.devops.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Testing Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <TestTube className="w-5 h-5 text-red-500" />
                            <h3 className="font-medium">Testing</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.testing.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Other Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <h3 className="font-medium">Other</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.other.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}