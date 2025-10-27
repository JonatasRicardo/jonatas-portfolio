import { describe, it, expect, vi } from 'vitest'
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}))
import { notFound } from 'next/navigation'
import * as lib from 'lib/api'
import Post, { generateMetadata, generateStaticParams } from './page'

vi.mock('components/header', () => ({
  __esModule: true,
  default: ({ title }: any) => <h1>{title}</h1>,
}))

vi.mock('components/articles/post-body', () => ({
  PostBody: ({ content }: any) => <div data-testid="post-body">{content.slice(0,5)}</div>,
}))

describe('Post [slug] page', () => {
  it('renders post when found', async () => {
    vi.spyOn(lib, 'getPostBySlug').mockReturnValue({
      slug: 'hello',
      title: 'Hello',
      description: 'desc',
      image: '/img.png',
      content: 'lorem ipsum',
      date: '2024-01-01',
    } as any)

    const ui = await Post({ params: Promise.resolve({ slug: 'hello' }) })
    expect(ui).toBeTruthy()
  })

  it('calls notFound when post is missing', async () => {
    vi.spyOn(lib, 'getPostBySlug').mockReturnValue(undefined as any)
    await Post({ params: Promise.resolve({ slug: 'missing' }) })
    expect(notFound).toHaveBeenCalled()
  })

  it('generateMetadata returns proper title and og image', async () => {
    vi.spyOn(lib, 'getPostBySlug').mockReturnValue({
      slug: 'hello',
      title: 'Hello',
      description: 'desc',
      image: '/img.png',
      content: 'lorem ipsum',
      date: '2024-01-01',
    } as any)

    const meta = await generateMetadata({ params: Promise.resolve({ slug: 'hello' }) } as any)
    expect(meta.title).toContain('Hello')
    expect(meta.openGraph?.images?.[0]).toBe('/img.png')
  })

  it('generateStaticParams maps slugs', async () => {
    vi.spyOn(lib, 'getAllPosts').mockReturnValue([
      { slug: 'a' },
      { slug: 'b' },
    ] as any)
    const params = await generateStaticParams()
    expect(params).toEqual([{ slug: 'a' }, { slug: 'b' }])
  })
})


