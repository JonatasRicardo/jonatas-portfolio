import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('fs', () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}))

vi.mock('gray-matter', () => ({
  default: vi.fn((file: string) => ({ data: {}, content: file })),
}))

import fs from 'fs'
import matter from 'gray-matter'
import { getAllPosts, getPostBySlug, getPostSlugs } from './api'

describe('lib/api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getPostSlugs reads directory', () => {
    ;(fs.readdirSync as any).mockReturnValue(['a.md', 'b.md'])
    const slugs = getPostSlugs()
    expect(slugs).toEqual(['a.md', 'b.md'])
  })

  it('getPostBySlug parses frontmatter and returns Post shape', () => {
    ;(fs.readFileSync as any).mockReturnValue('---\ntitle: Hello\ndate: 2024-01-01\nimage: /x.png\ndescription: desc\nexcerpt: ex\nogImage: { url: /x.png }\n---\nContent')
    ;(matter as any).mockReturnValue({
      data: {
        title: 'Hello',
        date: '2024-01-01',
        image: '/x.png',
        description: 'desc',
        excerpt: 'ex',
        ogImage: { url: '/x.png' },
      },
      content: 'Content',
    })

    const post = getPostBySlug('hello.md')
    expect(post.slug).toBe('hello')
    expect(post.title).toBe('Hello')
    expect(post.content).toBe('Content')
  })

  it('getAllPosts maps slugs, loads posts and sorts by date desc', () => {
    ;(fs.readdirSync as any).mockReturnValue(['b.md', 'a.md'])
    const bySlug: Record<string, any> = {
      'a.md': { slug: 'a', date: '2024-01-01' },
      'b.md': { slug: 'b', date: '2024-02-01' },
    }
    ;(fs.readFileSync as any).mockImplementation((p: string) => bySlug[p.split('/').pop() as string])
    ;(matter as any).mockImplementation(() => ({ data: {}, content: '' }))

    const posts = getAllPosts()
    expect(posts.map(p => p.slug)).toEqual(['b', 'a'])
  })
})


