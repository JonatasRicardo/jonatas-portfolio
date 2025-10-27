import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PortfolioFilter } from './portfolio-filter';

// Mock para Link e PortfolioCard
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: any }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('./portfolio-card', () => ({
  PortfolioCard: ({ title, description, image, category }: any) => (
    <div>{title} - {description} - {image} - {category}</div>
  ),
}));


const portfolioItemsMock = [
  { id: 1, title: 'Title1', description: 'Description1', image: '/img1.jpg', category: 'Cat1', slug: 'slug1' },
  { id: 2, title: 'Title2', description: 'Description2', image: '/img2.jpg', category: 'Cat2', slug: 'slug2' },
];

describe('PortfolioFilter', () => {
  it('renders portfolio items', () => {
    render(<PortfolioFilter portfolioItems={portfolioItemsMock} />);
    expect(screen.getByText('Title1 - Description1 - /img1.jpg - Cat1')).toBeInTheDocument();
    expect(screen.getByText('Title2 - Description2 - /img2.jpg - Cat2')).toBeInTheDocument();
  });

  it('renders links with correct href', () => {
    render(<PortfolioFilter portfolioItems={portfolioItemsMock} />);
    const link1 = screen.getByText('Title1 - Description1 - /img1.jpg - Cat1').closest('a');
    const link2 = screen.getByText('Title2 - Description2 - /img2.jpg - Cat2').closest('a');
    expect(link1).toHaveAttribute('href', '/posts/slug1');
    expect(link2).toHaveAttribute('href', '/posts/slug2');
  });
});
