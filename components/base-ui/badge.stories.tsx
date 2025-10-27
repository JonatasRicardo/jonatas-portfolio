import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: '2 Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'secondary', 'destructive', 'outline'] },
  },
  args: { variant: 'default' },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Default' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
