import type { Meta, StoryObj } from "@storybook/react";
import { Typing } from "./typing";

const meta = {
  title: "0 Chat/Typing",
  component: Typing,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Typing indicator for in-progress responses. Use `size` to adjust scale for each message context.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["small", "medium", "large"],
      description: "Size of the typing indicator.",
      table: {
        type: { summary: "\"small\" | \"medium\" | \"large\"" },
        defaultValue: { summary: "\"large\"" },
      },
    },
  },
  args: {
    size: "large",
  },
} satisfies Meta<typeof Typing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const AllSizes: Story = {
  name: "All sizes",
  render: () => (
    <div className="flex items-center gap-6">
      <Typing size="small" />
      <Typing size="medium" />
      <Typing size="large" />
    </div>
  ),
};
