import { render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ArticlesPreview } from './articles-preview';

// Mock motion/react to avoid animation complexity and expose props for assertions if needed
vi.mock('motion/react', async () => {
  const React = await import('react');
  type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
    initial?: unknown;
    animate?: unknown;
    transition?: unknown;
    children?: ReactNode;
  };
  const motion = new Proxy(
    {},
    {
      get: () =>
        React.forwardRef<HTMLDivElement, MotionDivProps>(function MotionDiv({ children, ...props }, ref) {
          return React.createElement('div', { ref, 'data-motion': 'true', ...props }, children);
        }),
    },
  );
  return { motion };
});

// Mock next/link to render as a regular anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string | { pathname?: string } } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { children?: ReactNode }) => (
    <a href={typeof href === 'string' ? href : (href as { pathname?: string })?.pathname ?? '/'} {...props}>{children}</a>
  ),
}));

// Stable date formatting
let toLocaleSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  const dateProto = Date.prototype as unknown as { toLocaleDateString: Date['toLocaleDateString'] };
  toLocaleSpy = vi.spyOn(dateProto, 'toLocaleDateString').mockReturnValue('January 1, 2023');
});

afterEach(() => {
  toLocaleSpy.mockRestore();
});

const makePost = (i: number, withDescription = true) => ({
  slug: `slug-${i}`,
  title: `Post ${i}`,
  date: '2023-01-01',
  image: `/img-${i}.png`,
  description: withDescription ? `Desc ${i}` : '',
  author: { name: 'Author', picture: '/a.png' },
  excerpt: `Excerpt ${i}`,
  ogImage: { url: '/og.png' },
  content: 'content',
});

describe('ArticlesPreview', () => {
  it('renders header and "View All" link', () => {
    render(<ArticlesPreview articles={[makePost(1)]} />);
    expect(screen.getByText('Articles')).toBeInTheDocument();
    const viewAll = screen.getByRole('link', { name: /View All/i });
    expect(viewAll).toHaveAttribute('href', '/posts');
  });

  it('renders at most 4 articles', () => {
    const posts = [makePost(1), makePost(2), makePost(3), makePost(4), makePost(5)];
    render(<ArticlesPreview articles={posts} />);
    // The first 4 titles should appear
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByText(`Post ${i}`)).toBeInTheDocument();
    }
    // The 5th should not appear
    expect(screen.queryByText('Post 5')).not.toBeInTheDocument();
  });

  it('uses description when present, falls back to excerpt when absent', () => {
    const posts = [makePost(1, true), makePost(2, false)];
    render(<ArticlesPreview articles={posts} />);
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
    expect(screen.getByText('Excerpt 2')).toBeInTheDocument();
  });

  it('renders image with title as alt and links by slug', () => {
    const posts = [makePost(1), makePost(2)];
    const { container } = render(<ArticlesPreview articles={posts} />);

    // Alt equals the title
    expect(screen.getByAltText('Post 1')).toBeInTheDocument();
    expect(screen.getByAltText('Post 2')).toBeInTheDocument();

    // Link for each slug
    expect(container.querySelector('a[href="/posts/slug-1"]')).toBeTruthy();
    expect(container.querySelector('a[href="/posts/slug-2"]')).toBeTruthy();
  });

  it('shows formatted date (mocked)', () => {
    render(<ArticlesPreview articles={[makePost(1)]} />);
    expect(screen.getByText('January 1, 2023')).toBeInTheDocument();
  });
});


