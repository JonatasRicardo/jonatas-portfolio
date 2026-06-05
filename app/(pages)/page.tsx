import React from "react"

import { HomePageContent, type HomeLanguage } from "components/home/home-page-content"
import { getAllPosts } from "lib/api"

interface HomePageProps {
  searchParams?: Promise<{
    lang?: string | string[]
  }>
}

function resolveHomeLanguage(lang?: string | string[]): HomeLanguage {
  const firstLanguage = Array.isArray(lang) ? lang[0] : lang

  return firstLanguage === "pt" ? "pt" : "en"
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const articles = getAllPosts()
  const params = await searchParams
  const language = resolveHomeLanguage(params?.lang)

  return <HomePageContent articles={articles} language={language} />
}
