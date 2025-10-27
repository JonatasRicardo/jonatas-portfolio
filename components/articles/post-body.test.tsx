import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PostBody } from './post-body';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> ) => {
    return <img {...props} />;
  },
}));

vi.mock('../markdown/markdown-renderer', () => ({
  MarkdownRenderer: ({ content }: { content: string }) => <div data-testid="md">{content}</div>,
}));

describe('PostBody', () => {
  it('renders markdown with the provided content', () => {
    render(<PostBody content="# título" />);
    expect(screen.getByTestId('md')).toHaveTextContent('# título');
  });

  it('renders image when image is provided', () => {
    render(<PostBody content="x" image="/img.png" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img.png');
  });

  it('does not render image when image is not provided', () => {
    render(<PostBody content="x" />);
    expect(screen.queryByRole('img')).toBeNull();
  });
});


