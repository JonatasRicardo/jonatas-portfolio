import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PortfolioCard } from './portfolio-card';

// Mock for ImageWithFallback
vi.mock('../base-ui/ImageWithFallback', () => ({
  ImageWithFallback: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('PortfolioCard', () => {
  it('renders image with alt text', () => {
    render(<PortfolioCard title="Title" description="Description" image="/test.jpg" category="Category" />);
    expect(screen.getByAltText('Title')).toBeInTheDocument();
  });

  it('renders title and description', () => {
    render(<PortfolioCard title="Title" description="Description" image="/test.jpg" category="Category" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
  });
});
