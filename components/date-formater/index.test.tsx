import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DateFormatter from './index';

describe('DateFormatter', () => {
  it('renders formatted date correctly', () => {
    render(<DateFormatter dateString="2023-01-01" />);
    const time = screen.getByText('January 1, 2023');
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('dateTime', '2023-01-01');
  });
});
