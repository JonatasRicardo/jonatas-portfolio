import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Template from './index';

// Mock de subcomponentes
vi.mock('components/sidebar', () => ({
  __esModule: true,
  default: () => <div>Sidebar</div>,
}));

vi.mock('components/chat', () => ({
  __esModule: true,
  default: () => <div>Chat</div>,
}));

describe('Template', () => {
  it('renders Sidebar and Chat components', () => {
    render(<Template><div>Main Content</div></Template>);
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Template><div>Main Content</div></Template>);
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });
});
