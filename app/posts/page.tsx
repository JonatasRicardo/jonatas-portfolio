import React from 'react';
import { PortfolioFilter } from '@/components/portfolio-filter';
import { getAllPosts } from '@/lib/api';
import Header from '@/components/header';

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