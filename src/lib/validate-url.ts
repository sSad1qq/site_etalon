import { resolve4, resolve6 } from 'node:dns/promises'

const BLOCKED_HOSTNAMES = new Set([
  'metadata.google.internal',
  'metadata.google.com',
  'kubernetes.default.svc',
])

/**
 * Returns true when the IPv4 address belongs to a private, loopback,
 * link-local, or cloud-metadata range that should never be reached
 * by outbound webhook calls.
 */
function isBlockedIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some(p => Number.isNaN(p))) return true

  const [a, b] = parts

  if (a === 0) return true                          // 0.0.0.0/8
  if (a === 10) return true                          // 10.0.0.0/8
  if (a === 127) return true                         // 127.0.0.0/8
  if (a === 169 && b === 254) return true            // 169.254.0.0/16  (link-local + cloud metadata)
  if (a === 172 && b >= 16 && b <= 31) return true   // 172.16.0.0/12
  if (a === 192 && b === 168) return true            // 192.168.0.0/16
  if (a === 100 && b >= 64 && b <= 127) return true  // 100.64.0.0/10  (CGNAT / cloud VPC)
  if (a === 192 && b === 0) return true                // 192.0.0.0/24  (IETF protocol assignments)
  if (a === 198 && (b === 18 || b === 19)) return true // 198.18.0.0/15 (benchmarking)
  if (a >= 224) return true                             // multicast, reserved, broadcast

  return false
}

function isBlockedIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase()
  if (normalized === '::') return true
  if (normalized === '::1') return true
  if (normalized.startsWith('::ffff:')) {
    return isBlockedIPv4(normalized.slice('::ffff:'.length))
  }
  if (normalized.startsWith('fe80:')) return true     // link-local
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true // ULA
  if (normalized.startsWith('ff')) return true         // multicast
  return false
}

export interface UrlValidationResult {
  valid: boolean
  reason?: string
}

/**
 * Validates a webhook URL against SSRF attacks by checking protocol,
 * hostname, and resolved IP addresses.
 */
export async function validateWebhookUrl(
  raw: string,
): Promise<UrlValidationResult> {
  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    return { valid: false, reason: 'Malformed URL' }
  }

  if (parsed.protocol !== 'https:') {
    return { valid: false, reason: `Disallowed protocol: ${parsed.protocol}` }
  }

  if (parsed.username || parsed.password) {
    return { valid: false, reason: 'Credentials in URL are not allowed' }
  }

  const hostname = parsed.hostname

  if (BLOCKED_HOSTNAMES.has(hostname)) {
    return { valid: false, reason: `Blocked hostname: ${hostname}` }
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    if (isBlockedIPv4(hostname)) {
      return { valid: false, reason: `Blocked IP address: ${hostname}` }
    }
    return { valid: true }
  }

  if (hostname.startsWith('[') && hostname.endsWith(']')) {
    const ipv6 = hostname.slice(1, -1)
    if (isBlockedIPv6(ipv6)) {
      return { valid: false, reason: `Blocked IPv6 address: ${ipv6}` }
    }
    return { valid: true }
  }

  try {
    const v4 = await resolve4(hostname).catch(() => [] as string[])
    const v6 = await resolve6(hostname).catch(() => [] as string[])

    for (const ip of v4) {
      if (isBlockedIPv4(ip)) {
        return { valid: false, reason: `${hostname} resolves to blocked IP ${ip}` }
      }
    }
    for (const ip of v6) {
      if (isBlockedIPv6(ip)) {
        return { valid: false, reason: `${hostname} resolves to blocked IPv6 ${ip}` }
      }
    }

    if (v4.length === 0 && v6.length === 0) {
      return { valid: false, reason: `Cannot resolve hostname: ${hostname}` }
    }
  } catch {
    return { valid: false, reason: `DNS resolution failed for ${hostname}` }
  }

  return { valid: true }
}
