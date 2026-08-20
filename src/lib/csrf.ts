/**
 * CSRF protection via Origin / Referer header verification.
 *
 * Modern browsers always send the `Origin` header on cross-origin POST
 * requests (and on same-origin fetches that aren't GET/HEAD).  If the
 * header is present we compare its host to the `Host` header of the
 * incoming request.  When `Origin` is absent we fall back to `Referer`.
 *
 * Requests that carry neither header are rejected — every mainstream
 * browser includes at least one of them on state-changing requests.
 */

function normalizeHost(raw: string): string {
  return raw.trim().toLowerCase()
}

function normalizeOrigin(raw: string): string | null {
  try {
    const url = new URL(raw)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url.origin.toLowerCase()
  } catch {
    return null
  }
}

function originMatchesHost(raw: string, host: string): boolean {
  try {
    const url = new URL(raw)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
    return url.host.toLowerCase() === normalizeHost(host)
  } catch {
    return false
  }
}

export interface CsrfResult {
  ok: boolean
  reason?: string
}

/**
 * Validates that the request originates from the same site by comparing
 * the Origin (or Referer) header to the Host header.
 *
 * Additional trusted origins can be supplied via `ALLOWED_ORIGINS`
 * (comma-separated list in the environment, e.g. for preview deploys).
 */
export function verifyCsrf(req: Request): CsrfResult {
  const host = req.headers.get('host')
  if (!host) {
    return { ok: false, reason: 'Missing Host header' }
  }

  const extraOrigins = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map(normalizeOrigin)
    .filter((origin): origin is string => origin !== null)

  const origin = req.headers.get('origin')

  if (origin) {
    if (originMatchesHost(origin, host)) return { ok: true }
    const normalizedOrigin = normalizeOrigin(origin)
    if (normalizedOrigin && extraOrigins.includes(normalizedOrigin)) {
      return { ok: true }
    }
    return { ok: false, reason: 'Origin mismatch' }
  }

  const referer = req.headers.get('referer')

  if (referer) {
    if (originMatchesHost(referer, host)) return { ok: true }
    const normalizedReferer = normalizeOrigin(referer)
    if (normalizedReferer && extraOrigins.includes(normalizedReferer)) {
      return { ok: true }
    }
    return { ok: false, reason: 'Referer mismatch' }
  }

  return { ok: false, reason: 'Missing Origin and Referer headers' }
}
