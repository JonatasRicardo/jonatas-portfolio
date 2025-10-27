import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock syntax highlighter to avoid refractor/prism runtime in tests
vi.mock('react-syntax-highlighter', () => ({
  __esModule: true,
  Prism: ({ children }: { children: React.ReactNode }) => (
    <pre>
      <code>{children}</code>
    </pre>
  ),
}));

// Mock styles import used by the component
vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  __esModule: true,
  dracula: {},
  gruvboxLight: {},
  gruvboxDark: {},
}));

import { MarkdownRenderer } from './markdown-renderer';

describe('MarkdownRenderer', () => {
  it('renders markdown content', () => {
    render(<MarkdownRenderer content="**bold** _italic_" />);
    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
  });

  it('renders code block', () => {
    const codeContent = '```js\nconsole.log("Hello")\n```';
    const { container } = render(<MarkdownRenderer content={codeContent} />);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('renders links', () => {
    render(<MarkdownRenderer content="[example](http://example.com)" />);
    const link = screen.getByRole('link', { name: /example/i });
    expect(link).toHaveAttribute('href', 'http://example.com');
  });
});
