import type { Meta, StoryObj } from '@storybook/react';
import Template from '.';

const meta: Meta<typeof Template> = {
  title: '1 Layout/Template',
  component: Template,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  render: () => (
    <Template>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Page Title</h1>
        <p className="text-muted-foreground">This is an example content inside the Template layout.</p>
      </div>
    </Template>
  ),
};


