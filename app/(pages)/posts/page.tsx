import React from 'react';
import Header from 'components/header';
import { PortfolioFilter } from 'components/portfolio/portfolio-filter';
import { getAllPosts } from 'lib/api';

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