import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CoverImage from './index';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: any }) => (
    <a href={href}>{children}</a>
  ),
}));


describe('CoverImage', () => {
  it('renders the image with link when slug is provided', () => {
    render(<CoverImage title="Test Title" src="/test.jpg" slug="test-slug" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/posts/test-slug');
    expect(screen.getByAltText('Cover Image for Test Title')).toHaveAttribute('src', '/test.jpg');
  });

  it('renders the image without link when slug is not provided', () => {
    render(<CoverImage title="Test Title" src="/test.jpg" />);
    expect(screen.getByAltText('Cover Image for Test Title')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
