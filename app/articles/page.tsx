import React from 'react';
import { PortfolioFilter } from '@/src/components/portfolio-filter';
import { getAllArticles } from '@/src/lib/api';
import Header from '@/src/components/header';

export default function ArticlesPage() {
  const portfolioItems = getAllArticles();

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