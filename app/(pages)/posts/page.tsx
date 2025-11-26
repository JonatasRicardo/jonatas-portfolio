import React from 'react';
import Header from 'components/header';
import { PortfolioFilter } from 'components/portfolio/portfolio-filter';
import { getAllPosts } from 'lib/api';

export default function ArticlesPage() {
  const posts = getAllPosts();
  const portfolioItems = posts.map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.description,
    image: post.image,
    category: 'Article',
  }));

  return (
    <>
      <Header
        title='Articles & Portfolio'
        description='Explore my latest work and projects'
      />

      <PortfolioFilter portfolioItems={portfolioItems} />
    </>
  );
}