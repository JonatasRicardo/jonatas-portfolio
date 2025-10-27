import { render, screen } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import ArticlesPage from './page'

vi.mock('lib/api', () => ({
  getAllPosts: vi.fn(() => [
    { slug: 'one', title: 'Post One', description: 'desc', date: '2024-01-01', image: '/img.png', content: '...' },
  ]),
}))

vi.mock('components/portfolio/portfolio-filter', () => ({
  PortfolioFilter: ({ portfolioItems }: any) => (
    <div data-testid="portfolio-filter-count">{portfolioItems.length}</div>
  ),
}))

vi.mock('components/header', () => ({
  __esModule: true,
  default: ({ title }: any) => <h1>{title}</h1>,
}))

describe('ArticlesPage', () => {
  it('renders header and passes posts to PortfolioFilter', () => {
    render(<ArticlesPage />)
    expect(screen.getByRole('heading', { name: 'Articles & Portfolio' })).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-filter-count')).toHaveTextContent('1')
  })
})


