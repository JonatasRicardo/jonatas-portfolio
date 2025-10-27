import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Button } from './button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
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
