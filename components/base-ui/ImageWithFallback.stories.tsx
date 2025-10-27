import type { Meta, StoryObj } from '@storybook/react';
import { ImageWithFallback } from './ImageWithFallback';

const meta: Meta<typeof ImageWithFallback> = {
  title: 'Components/Data Display/ImageWithFallback',
  component: ImageWithFallback,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof ImageWithFallback>;

export const Default: Story = {
  render: () => (
    <ImageWithFallback src="https://picsum.photos/120/80" alt="OK" width={120} height={80} />
  ),
};

export const Broken: Story = {
  render: () => (
    <ImageWithFallback src="/broken.png" alt="Broken" width={120} height={80} />
  ),
};
