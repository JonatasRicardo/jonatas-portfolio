import React from "react"

import { HomePageContent } from "components/home/home-page-content"
import { getAllPosts } from "lib/api"

export default function HomePage() {
  const articles = getAllPosts()

  return <HomePageContent articles={articles} />
}
