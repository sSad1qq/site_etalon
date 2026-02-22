interface RateLimiterOptions {
  windowMs?: number
  maxRequests?: number
}

const DEFAULT_WINDOW_MS = 60_000
const DEFAULT_MAX_REQUESTS = 5

export function createRateLimiter(opts: RateLimiterOptions = {}) {
  const windowMs = opts.windowMs ?? DEFAULT_WINDOW_MS
  const maxRequests = opts.maxRequests ?? DEFAULT_MAX_REQUESTS
  const hits = new Map<string, number[]>()

  const cleanup = setInterval(() => {
    const now = Date.now()
    for (const [key, ts] of hits) {
      const fresh = ts.filter(t => now - t < windowMs)
      if (fresh.length === 0) hits.delete(key)
      else hits.set(key, fresh)
    }
  }, windowMs)

  if (typeof cleanup === 'object' && 'unref' in cleanup) {
    cleanup.unref()
  }

  return {
    isLimited(key: string): boolean {
      const now = Date.now()
      const timestamps = (hits.get(key) ?? []).filter(t => now - t < windowMs)
      if (timestamps.length >= maxRequests) {
        hits.set(key, timestamps)
        return true
      }
      timestamps.push(now)
      hits.set(key, timestamps)
      return false
    },
  }
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}
