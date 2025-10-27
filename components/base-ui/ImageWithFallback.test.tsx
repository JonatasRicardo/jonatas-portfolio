import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from './ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders image with alt', () => {
    render(<ImageWithFallback src="/ok.png" alt="Example" />);
    expect(screen.getByAltText('Example')).toBeInTheDocument();
  });

  it('shows fallback when image fails', () => {
    render(<ImageWithFallback src="/broken.png" alt="Broken" data-testid="img" />);
    const img = screen.getByTestId('img');
    fireEvent.error(img);
    // Fallback renders internal SVG with alt "Error loading image"
    expect(screen.getByAltText('Error loading image')).toBeInTheDocument();
  });
});
