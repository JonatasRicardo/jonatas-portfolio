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

describe('lib/api edge cases', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getPostBySlug removes .md when present', () => {
    ;(fs.readFileSync as any).mockReturnValue('file')
    ;(matter as any).mockReturnValue({ data: {}, content: 'x' })
    const post = getPostBySlug('hello.md')
    expect(post.slug).toBe('hello')
  })

  it('getAllPosts handles empty directory', () => {
    ;(fs.readdirSync as any).mockReturnValue([])
    const posts = getAllPosts()
    expect(posts).toEqual([])
  })
})


