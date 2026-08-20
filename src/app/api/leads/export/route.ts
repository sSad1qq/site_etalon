import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { createRateLimiter, getClientIp } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'
import { secureCompare } from '@/lib/secure-compare'
import { toCsv } from '@/lib/csv'
import { LEADS_DATA_FILE } from '@/lib/lead-storage-path'

const EXPORT_SECRET = process.env.EXPORT_SECRET ?? ''

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 10 })

function authorize(req: NextRequest): boolean {
  if (!EXPORT_SECRET) return false

  const header = req.headers.get('authorization') ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return false

  return secureCompare(token, EXPORT_SECRET)
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req)
  if (limiter.isLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      { status: 429 },
    )
  }

  if (!authorize(req)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  try {
    const raw = await fs.readFile(LEADS_DATA_FILE, 'utf8').catch(() => '[]')
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error('Lead storage must contain a JSON array')
    }
    const rows = parsed
    const csv = toCsv(rows)

    const headers = new Headers()
    headers.set('Content-Type', 'text/csv; charset=utf-8')
    headers.set('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().slice(0,10)}.csv"`)
    headers.set('Cache-Control', 'private, no-store, max-age=0')

    return new NextResponse(csv, { status: 200, headers })
  } catch (err) {
    logger.error('Leads export failed', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    })
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
