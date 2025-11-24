import type { Meta, StoryObj } from '@storybook/react';
import { ResumePreview } from './resume-preview';

const meta: Meta<typeof ResumePreview> = {
  title: '2 Components/Resume/ResumePreview',
  component: ResumePreview,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ResumePreview>;

export const Default: Story = {};


