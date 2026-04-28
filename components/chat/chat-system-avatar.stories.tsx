import type { Meta, StoryObj } from "@storybook/react";
import { ChatSystemAvatar } from "./chat-system-avatar";

const meta = {
  title: "0 Chat/ChatSystemAvatar",
  component: ChatSystemAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "System avatar displayed beside assistant messages. The `hide` prop can hide the avatar in blocks like forms and user messages.",
      },
    },
  },
  argTypes: {
    hide: {
      control: { type: "boolean" },
      description: "Hides the avatar when `true`.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    hide: false,
  },
} satisfies Meta<typeof ChatSystemAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visible: Story = {};

export const Hidden: Story = {
  args: {
    hide: true,
  },
};
