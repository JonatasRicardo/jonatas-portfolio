import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageBlock } from "./chat-message-block";
import { Typing } from "./typing";

const meta = {
  title: "0 Chat/ChatMessageBlock",
  component: ChatMessageBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Base message block for chat. Controls avatar visibility, alignment, and visual style by `role`.",
      },
    },
  },
  argTypes: {
    role: {
      control: { type: "select" },
      options: ["assistant", "system", "user", "loading", "form"],
      description: "Defines alignment, style, and avatar visibility.",
      table: {
        type: { summary: "\"assistant\" | \"system\" | \"user\" | \"loading\" | \"form\"" },
        defaultValue: { summary: "\"assistant\"" },
      },
    },
    children: {
      control: false,
    },
  },
  args: {
    role: "assistant",
  },
} satisfies Meta<typeof ChatMessageBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Assistant: Story = {
  args: {
    role: "assistant",
    children: (
      <p className="text-sm">
        Hello, I am Jonatas&apos;s assistant. How can I help you today?
      </p>
    ),
  },
  render: (args) => <ChatMessageBlock {...args} />,
};

export const User: Story = {
  args: {
    role: "user",
    children: (
      <p className="text-sm">Tell me more about your recent frontend projects.</p>
    ),
  },
  render: (args) => <ChatMessageBlock {...args} />,
};

export const System: Story = {
  args: {
    role: "system",
    children: (
      <p className="text-sm">
        Context loaded: portfolio knowledge base and resume highlights are available.
      </p>
    ),
  },
  render: (args) => <ChatMessageBlock {...args} />,
};

export const Loading: Story = {
  args: {
    role: "loading",
    children: <Typing size="small" />,
  },
  render: (args) => <ChatMessageBlock {...args} />,
};

export const FormContainer: Story = {
  args: {
    role: "form",
    children: (
      <form className="flex gap-2">
        <textarea
          className="min-h-[60px] w-full resize-none rounded-md border border-border bg-transparent p-2 text-sm"
          placeholder="Type a message and submit..."
        />
        <button
          type="button"
          className="h-10 rounded-full border border-border px-4 text-sm"
        >
          Send
        </button>
      </form>
    ),
  },
  render: (args) => <ChatMessageBlock {...args} />,
};
