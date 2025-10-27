import { render, screen } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import ResumePage from './page'

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

vi.mock('components/base-ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

vi.mock('components/resume/resume-data', () => ({
  experiences: [
    { id: 1, title: 'FE', company: 'X', period: '2020', description: 'desc' },
  ],
  education: [
    { id: 1, degree: 'BSc', institution: 'Uni', period: '2010', description: 'ok' },
  ],
  skills: { frontend: [], backend: [], ai_ml_data: [], devops: [], testing: [], other: [] },
}))

describe('ResumePage', () => {
  it('renders headings and a download button', () => {
    render(<ResumePage />)
    expect(screen.getByRole('heading', { name: /Resume & Experience/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Download PDF/i })).toBeInTheDocument()
  })
})


