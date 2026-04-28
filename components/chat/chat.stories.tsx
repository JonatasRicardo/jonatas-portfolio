import type { Meta, StoryObj } from "@storybook/react";
import Chat from "./chat";

const meta = {
  title: "0 Chat/Chat",
  component: Chat,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Main chat component. It integrates message rendering, send form, conversation clearing, and loading state. It uses `useChat` and sends messages to `/api/chat`.",
      },
    },
  },
} satisfies Meta<typeof Chat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-4xl p-6">
      <Chat />
    </div>
  ),
};

export const NarrowLayout: Story = {
  name: "Narrow layout",
  render: () => (
    <div className="mx-auto w-full max-w-2xl p-6">
      <Chat />
    </div>
  ),
};
