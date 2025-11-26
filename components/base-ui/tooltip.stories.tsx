import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: '2 Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-describedby="tt">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent id="tt" sideOffset={2}>
        Tooltip text
      </TooltipContent>
    </Tooltip>
  ),
};

export const KeyboardNavigation: Story = { ...Default };
