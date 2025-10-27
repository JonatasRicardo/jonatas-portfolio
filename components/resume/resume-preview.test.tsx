import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ResumePreview } from './resume-preview';

// Mock de subcomponentes e ícones
vi.mock('components/resume/experience-card', () => ({
  ExperienceCard: ({ title, company, period }: any) => <div>{title} - {company} - {period}</div>,
}));

vi.mock('components/resume/education-card', () => ({
  EducationCard: ({ degree, institution, period }: any) => <div>{degree} - {institution} - {period}</div>,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: any }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('lucide-react', () => ({
  ArrowRight: (props: any) => <svg {...props} />,
  Briefcase: (props: any) => <svg {...props} />,
  GraduationCap: (props: any) => <svg {...props} />,
}));

describe('ResumePreview', () => {
  it('renders latest experience and education', () => {
    render(<ResumePreview />);
    expect(screen.getByText('Senior Frontend Engineer - Optii Solutions – Texas, USA (Remote) - Apr 2022 – Present')).toBeInTheDocument();
    expect(screen.getByText('MIT Professional Certificate in Data Science and Machine Learning - Massachusetts Institute of Technology (MIT) - Jun – Oct 2025')).toBeInTheDocument();
  });

  it('renders link to full resume', () => {
    render(<ResumePreview />);
    const link = screen.getByRole('link', { name: /View Full Resume/i });
    expect(link).toHaveAttribute('href', '/resume');
  });
});
