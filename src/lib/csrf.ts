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
  return raw.replace(/:\d+$/, '').toLowerCase()
}

function originMatchesHost(origin: string, host: string): boolean {
  try {
    const originHost = new URL(origin).hostname.toLowerCase()
    return originHost === normalizeHost(host)
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
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)

  const origin = req.headers.get('origin')

  if (origin) {
    if (originMatchesHost(origin, host)) return { ok: true }
    if (extraOrigins.some(o => originMatchesHost(o, host) || origin.toLowerCase() === o)) {
      return { ok: true }
    }
    return { ok: false, reason: 'Origin mismatch' }
  }

  const referer = req.headers.get('referer')

  if (referer) {
    if (originMatchesHost(referer, host)) return { ok: true }
    if (extraOrigins.some(o => {
      try { return new URL(referer).hostname.toLowerCase() === new URL(o).hostname.toLowerCase() } catch { return false }
    })) {
      return { ok: true }
    }
    return { ok: false, reason: 'Referer mismatch' }
  }

  return { ok: false, reason: 'Missing Origin and Referer headers' }
}
