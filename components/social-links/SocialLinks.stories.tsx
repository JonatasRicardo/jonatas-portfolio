import type { Meta, StoryObj } from "@storybook/react"
import { SocialLinks } from ".";

const meta: Meta<typeof SocialLinks> = {
  title: "2 Components/SocialLinks",
  component: SocialLinks,
};

type Story = StoryObj<typeof SocialLinks>;

export const Default: Story = {
  render: () => <SocialLinks />,
};

export default meta;


