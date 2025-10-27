import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, afterEach, beforeEach } from 'vitest';
import Chat, { Typing, ChatMessageBlock } from './index';

// Mock dependencies
vi.mock('@ai-sdk/react', () => {
    const defaultImpl = {
      messages: [],
      sendMessage: vi.fn(),
      status: 'ready',
      error: null,
      setMessages: vi.fn(),
    };
    return {
      useChat: vi.fn(() => defaultImpl),
    };
});

import { useChat } from '@ai-sdk/react'; 

vi.mock('lucide-react', () => ({
  ArrowUp: () => <svg data-testid="icon-arrow-up" />,
  Trash2: () => <svg data-testid="icon-trash" />,
}));

vi.mock('motion/react', async () => {
  const React = await import('react');
  const motion = new Proxy(
    {},
    {
      get: () =>
        React.forwardRef(function MotionDiv({ children, ...props }, ref) {
          return React.createElement('div', { ref, ...props }, children);
        }),
    },
  );
  return { motion };
});

vi.mock('components/profile-avatar', () => ({
  ProfileAvatar: ({ className }: { className?: string }) => <div className={`profile-avatar ${className}`} />,
}));

vi.mock('components/base-ui/textarea', () => ({
  Textarea: ({ value, onChange, onKeyDown, ...props }: any) => (
    <textarea value={value} onChange={onChange} onKeyDown={onKeyDown} {...props} />
  ),
}));

// Chat Component Tests
describe('Chat Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup after each test
    vi.clearAllMocks();
  });

  it('should render the Chat component correctly', async () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText("Hi, I'm Jonatas. What do you want to ask me?")).toBeInTheDocument();
    expect(screen.getByTestId('icon-arrow-up')).toBeInTheDocument();
  });

  it('should allow sending a message', async () => {
    const sendMessageMock = vi.fn();
    vi.mocked(useChat).mockReturnValue({
      messages: [],
      sendMessage: sendMessageMock,
      status: 'ready',
      error: null,
      setMessages: vi.fn(),
    });

    render(<Chat />);
    const input = screen.getByPlaceholderText("Hi, I'm Jonatas. What do you want to ask me?");

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByTestId('icon-arrow-up'));

    await waitFor(() => {
      expect(sendMessageMock).toHaveBeenCalledWith({ text: 'Hello' });
    });
  });

  it('should allow clearing messages', async () => {
    const setMessagesMock = vi.fn();
    vi.mocked(useChat).mockReturnValue({
      messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello' }] }],
      sendMessage: vi.fn(),
      status: 'ready',
      error: null,
      setMessages: setMessagesMock,
    });

    render(<Chat />);
    const trashIcon = screen.getByTestId('icon-trash');

    fireEvent.click(trashIcon);

    await waitFor(() => {
      expect(setMessagesMock).toHaveBeenCalledWith([]);
    });
  });
});

describe('Typing Animation', () => {
  it('should render the Typing component correctly', () => {
    const { container } = render(<Typing size="large" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

describe('ChatMessageBlock', () => {
  it('should render the ChatMessageBlock component correctly', () => {
    const { container } = render(
      <ChatMessageBlock role="user">
        <p>Test Message</p>
      </ChatMessageBlock>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
