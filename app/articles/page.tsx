import React from 'react';
import { PortfolioFilter } from '@/src/components/PortfolioFilter';
import { getAllArticles } from '@/src/lib/api';
import Header from '@/src/components/Header';

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