import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('api/health GET', () => {
  it('should return status ok as JSON', async () => {
    const res = await GET()
    expect(res).toBeInstanceOf(Response)
    expect(res.headers.get('content-type')).toContain('application/json')
    const json = await res.json()
    expect(json).toEqual({ status: 'ok' })
  })
})


