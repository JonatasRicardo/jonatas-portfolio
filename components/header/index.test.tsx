import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Header from './index';


// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  // Forward onClick and any other props to the anchor so events fire in tests
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('lucide-react', () => ({
  ArrowLeft: (props: any) => <svg {...props} />,
}));

// Mock global window object for location
const mockBack = vi.fn();
global.window = Object.create(window);
Object.defineProperty(window, 'history', {
  value: {
    back: mockBack,
  },
});

describe('Header', () => {
  it('renders title and description', () => {
    render(<Header title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('triggers history back on button click', async () => {
    const user = userEvent.setup();
    render(<Header title="Test Title" />);
    const link = screen.getByRole('link');
    await user.click(link)
    expect(mockBack).toHaveBeenCalled();
  });
});
