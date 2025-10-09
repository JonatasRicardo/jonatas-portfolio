import React from 'react';
import { PortfolioFilter } from 'app/components/portfolio-filter';
import { getAllPosts } from 'app/lib/api';
import Header from 'app/components/header';

export default function ArticlesPage() {
  const portfolioItems = getAllPosts();

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