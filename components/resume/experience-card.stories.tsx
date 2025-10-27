import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceCard } from './experience-card';

const meta: Meta<typeof ExperienceCard> = {
  title: '2 Components/Resume/ExperienceCard',
  component: ExperienceCard,
  parameters: { layout: 'centered' },
  args: {
    title: 'Senior Frontend Engineer',
    company: 'Optii Solutions – Texas, USA (Remote)',
    period: 'Apr 2022 – Present',
    description:
      'Leading the frontend architecture of hotel and housekeeping SaaS applications using React, TypeScript, GraphQL, and Node.js.',
    delay: 0,
    preview: false,
  },
};

export default meta;

type Story = StoryObj<typeof ExperienceCard>;

export const Default: Story = {};

export const PreviewMode: Story = {
  args: { preview: true },
};


