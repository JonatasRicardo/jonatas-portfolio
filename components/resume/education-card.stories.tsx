import type { Meta, StoryObj } from '@storybook/react';
import { EducationCard } from './education-card';

const meta: Meta<typeof EducationCard> = {
  title: '2 Components/Resume/EducationCard',
  component: EducationCard,
  parameters: { layout: 'centered' },
  args: {
    degree: 'MIT Professional Certificate in Data Science and Machine Learning',
    institution: 'Massachusetts Institute of Technology (MIT)',
    period: 'Jun – Oct 2025',
    description:
      'Studied inferential statistics, supervised and unsupervised learning, XGBoost, Random Forest, Gradient Boosting, and recommender systems.',
    delay: 0,
    preview: false,
  },
};

export default meta;

type Story = StoryObj<typeof EducationCard>;

export const Default: Story = {};

export const PreviewMode: Story = {
  args: { preview: true },
};


