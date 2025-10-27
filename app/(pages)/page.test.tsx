import { render, screen } from '@testing-library/react'
import { describe, it, vi, expect, beforeEach } from 'vitest'
import HomePage from './page'

vi.mock('lib/api', () => ({
  getAllPosts: vi.fn(() => []),
}))

vi.mock('components/resume/resume-preview', () => ({
  ResumePreview: () => <div data-testid="resume-preview" />,
}))

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders presentation content and resume preview', () => {
    render(<HomePage />)

    expect(
      screen.getByText(/Senior Fullstack Engineer/i)
    ).toBeInTheDocument()

    expect(screen.getByTestId('resume-preview')).toBeInTheDocument()
  })
})


