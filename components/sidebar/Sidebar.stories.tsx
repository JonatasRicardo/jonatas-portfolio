import type { Meta, StoryObj } from "@storybook/react"
import Sidebar from ".";

const meta: Meta<typeof Sidebar> = {
  title: "2 Components/Sidebar",
  component: Sidebar,
};

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => <Sidebar />,
};

export default meta;


