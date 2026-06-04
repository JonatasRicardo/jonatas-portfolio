"use client"

import { ArrowRight, Briefcase, GraduationCap } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import React from "react"
import { EducationCard } from "components/resume/education-card"
import { ExperienceCard } from "components/resume/experience-card"
import { education, experiences } from "./resume-data"

interface ResumePreviewLabels {
  title: string
  viewFull: string
  latestExperience: string
  recentEducation: string
}

interface ResumePreviewProps {
  labels?: ResumePreviewLabels
}

const defaultLabels: ResumePreviewLabels = {
  title: "Resume Preview",
  viewFull: "View Full Resume",
  latestExperience: "Latest Experience",
  recentEducation: "Recent Education",
}

export function ResumePreview({ labels = defaultLabels }: ResumePreviewProps = {}) {
  const latestExperience = experiences[0]
  const latestEducation = education.slice(0, 2)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{labels.title}</h2>

        <Link
          href="/resume"
          className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-300"
        >
          {labels.viewFull}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Latest Experience */}
      <div className="space-y-3">
        <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
          <Briefcase className="h-4 w-4" />
          {labels.latestExperience}
        </div>
        {latestExperience && (
          <ExperienceCard
            title={latestExperience.title}
            company={latestExperience.company}
            period={latestExperience.period}
            description={latestExperience.description}
            delay={0}
            preview
          />
        )}
      </div>

      {/* Latest Education */}
      <div className="space-y-3">
        <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
          <GraduationCap className="h-4 w-4" />
          {labels.recentEducation}
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
  )
}
