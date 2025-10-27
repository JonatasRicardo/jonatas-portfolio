import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Badge variant="default">A</Badge>);
    expect(screen.getByText('A')).toBeInTheDocument();
    rerender(<Badge variant="destructive">A</Badge>);
    expect(screen.getByText('A').className).toMatch(/destructive|bg-destructive|text-white/);
  });
});
