import type { Meta, StoryObj } from '@storybook/react';
import { ArticlesPreview } from './articles-preview';

const meta: Meta<typeof ArticlesPreview> = {
  title: '2 Components/ArticlesPreview',
  component: ArticlesPreview,
  parameters: { layout: 'padded' },
  args: {
    articles: Array.from({ length: 4 }).map((_, i) => ({
      slug: `slug-${i + 1}`,
      title: `Post ${i + 1}`,
      date: '2023-01-01',
      image: '/posts/ecom-mvp.png',
      description: `Desc ${i + 1}`,
      author: { name: 'Author', picture: '/a.png' },
      excerpt: `Excerpt ${i + 1}`,
      ogImage: { url: '/og.png' },
      content: 'content',
    })),
  },
};

export default meta;

type Story = StoryObj<typeof ArticlesPreview>;

export const Default: Story = {};


