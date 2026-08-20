import { describe, expect, it } from 'vitest'
import { createRateLimiter, getClientIp } from './rate-limit'

describe('createRateLimiter', () => {
  it('limits requests after the configured threshold', () => {
    const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 2 })

    expect(limiter.isLimited('client')).toBe(false)
    expect(limiter.isLimited('client')).toBe(false)
    expect(limiter.isLimited('client')).toBe(true)
    expect(limiter.isLimited('another-client')).toBe(false)
  })
})

describe('getClientIp', () => {
  it('uses the first forwarded address', () => {
    const request = new Request('https://example.com', {
      headers: { 'x-forwarded-for': '203.0.113.10, 198.51.100.2' },
    })

    expect(getClientIp(request)).toBe('203.0.113.10')
  })
})
