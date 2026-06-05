"use client"

import { ArrowRight, BriefcaseBusiness } from "lucide-react"
import Link from "next/link"
import React from "react"

import { ArticlesPreview } from "components/articles/articles-preview"
import { cn } from "components/base-ui/cn"
import Content from "components/content"
import { ContentBlock } from "components/content-block"
import { ResumePreview } from "components/resume/resume-preview"
import type { Post } from "interfaces/post"

export type HomeLanguage = "pt" | "en"

interface HomePageContentProps {
  articles: Post[]
  language: HomeLanguage
}

const homeCopy = {
  pt: {
    languageLabel: "Idioma da página",
    intro: {
      paragraphs: [
        <>
          Oi, eu sou{" "}
          <strong itemProp="givenName" className="text-foreground">
            Jônatas Ricardo Santos
          </strong>
          , Senior Fullstack Engineer com mais de{" "}
          <span aria-label="15 anos de experiência" className="text-foreground">
            15 anos
          </span>{" "}
          de experiência. Trabalho com <strong>React, Next.js, TypeScript e GraphQL</strong>, criando produtos digitais
          rápidos, claros e bem estruturados.
        </>,
        <>
          Também atuo como <strong>consultor web</strong> para negócios que vendem pelo Instagram e WhatsApp, ajudando a
          transformar atendimento, loja, site e automação em uma estrutura que vende com menos esforço manual.
        </>,
        <>
          Aqui eu reúno <strong>projetos</strong>, <strong>artigos</strong> e aprendizados práticos sobre arquitetura
          frontend, design systems, IA e produtos digitais. Você também pode conversar comigo pelo chat no fim da
          página.
        </>,
      ],
    },
    consulting: {
      eyebrow: "Consultoria e serviços",
      title: "Sites, lojas, apps e automações para vender melhor pela internet.",
      description:
        "Uma frente mais prática do meu trabalho: presença digital, loja online, atendimento com IA e estratégia para quem quer parar de depender só do direct e do WhatsApp.",
      primaryAction: "Ver consultoria",
    },
    previews: {
      articlesTitle: "Artigos",
      articlesLink: "Ver todos",
      resumeTitle: "Currículo",
      resumeLink: "Ver currículo completo",
      latestExperience: "Experiência recente",
      recentEducation: "Formação recente",
      dateLocale: "pt-BR",
    },
  },
  en: {
    languageLabel: "Page language",
    intro: {
      paragraphs: [
        <>
          Hi, my name is{" "}
          <strong itemProp="givenName" className="text-foreground">
            Jônatas Ricardo Santos
          </strong>
          , a Senior Fullstack Engineer with over{" "}
          <span aria-label="15 years of experience" className="text-foreground">
            15 years
          </span>{" "}
          of experience. I build high-performance, user-centric web applications with{" "}
          <strong>React, Next.js, TypeScript, and GraphQL</strong>.
        </>,
        <>
          I also work as a <strong>web consultant</strong> for businesses selling through Instagram and WhatsApp,
          helping turn websites, stores, automation, and customer support into a structure that sells with less manual
          effort.
        </>,
        <>
          Here I share <strong>projects</strong>, <strong>articles</strong>, and practical insights on frontend
          architecture, design systems, AI, and digital products. You can also chat with me at the bottom of the page.
        </>,
      ],
    },
    consulting: {
      eyebrow: "Consulting and services",
      title: "Websites, stores, apps, and automations for selling better online.",
      description:
        "A more practical side of my work: digital presence, online stores, AI-powered support, and strategy for businesses that need to stop depending only on DMs and WhatsApp.",
      primaryAction: "View consulting",
    },
    previews: {
      articlesTitle: "Articles",
      articlesLink: "View all",
      resumeTitle: "Resume",
      resumeLink: "View full resume",
      latestExperience: "Latest experience",
      recentEducation: "Recent education",
      dateLocale: "en-US",
    },
  },
} satisfies Record<
  HomeLanguage,
  {
    languageLabel: string
    intro: {
      paragraphs: React.ReactNode[]
    }
    consulting: {
      eyebrow: string
      title: string
      description: string
      primaryAction: string
    }
    previews: {
      articlesTitle: string
      articlesLink: string
      resumeTitle: string
      resumeLink: string
      latestExperience: string
      recentEducation: string
      dateLocale: string
    }
  }
>

export function HomePageContent({ articles, language }: HomePageContentProps) {
  const copy = homeCopy[language]

  return (
    <ContentBlock isFirst>
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="border-border border-b pb-6"
      >
        <nav
          aria-label={copy.languageLabel}
          className="text-muted-foreground mb-4 flex justify-end text-xs font-medium tracking-[0.08em]"
        >
          <Link
            aria-current={language === "en" ? "page" : undefined}
            className={cn(
              "hover:text-foreground px-1.5 py-1 transition-colors",
              language === "en" && "text-foreground"
            )}
            href="/?lang=en"
          >
            EN
          </Link>
          <span aria-hidden="true" className="py-1">
            /
          </span>
          <Link
            aria-current={language === "pt" ? "page" : undefined}
            className={cn(
              "hover:text-foreground px-1.5 py-1 transition-colors",
              language === "pt" && "text-foreground"
            )}
            href="/?lang=pt"
          >
            PT
          </Link>
        </nav>

        <div className="space-y-5">
          {copy.intro.paragraphs.map((paragraph, index) => (
            <p className="text-accent-foreground leading-relaxed" key={index}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="border-border mt-6 border-t pt-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase">
                <BriefcaseBusiness className="size-4" />
                <span>{copy.consulting.eyebrow}</span>
              </div>
              <h2 className="text-foreground text-lg font-semibold">{copy.consulting.title}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{copy.consulting.description}</p>
            </div>

            <div className="flex shrink-0">
              <Link
                className="group bg-foreground text-background hover:bg-foreground/90 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                href="/consultoria-web"
              >
                {copy.consulting.primaryAction}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Content>

      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
        {articles.length > 0 && (
          <ArticlesPreview
            articles={articles}
            dateLocale={copy.previews.dateLocale}
            labels={{
              title: copy.previews.articlesTitle,
              viewAll: copy.previews.articlesLink,
            }}
          />
        )}

        <ResumePreview
          labels={{
            latestExperience: copy.previews.latestExperience,
            recentEducation: copy.previews.recentEducation,
            title: copy.previews.resumeTitle,
            viewFull: copy.previews.resumeLink,
          }}
        />
      </div>
    </ContentBlock>
  )
}
