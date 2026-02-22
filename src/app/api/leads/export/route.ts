import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import crypto from 'crypto'
import { createRateLimiter, getClientIp } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const DATA_FILE = `${process.cwd()}/data/leads.json`
const EXPORT_SECRET = process.env.EXPORT_SECRET ?? ''

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 10 })

function authorize(req: NextRequest): boolean {
  if (!EXPORT_SECRET) return false

  const header = req.headers.get('authorization') ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return false

  return crypto.timingSafeEqual(
    Buffer.from(token, 'utf8'),
    Buffer.from(EXPORT_SECRET, 'utf8'),
  )
}

function toCsv(rows: unknown[]) {
  if (!rows || rows.length === 0) return ''
  const keys = Array.from(rows.reduce((s: Set<string>, r: unknown) => {
    const obj = (r as Record<string, unknown>) || {}
    Object.keys(obj).forEach(k => s.add(k))
    return s
  }, new Set<string>()))

  const header = keys.join(',')
  const lines = rows.map((r: unknown) => {
    const obj = (r as Record<string, unknown>) || {}
    return keys.map(k => {
      const raw = obj[k]
      const val = raw === undefined || raw === null ? '' : String(raw)
      const escaped = val.replace(/"/g, '""')
      if (/[",\n]/.test(escaped)) return `"${escaped}"`
      return escaped
    }).join(',')
  })

  return [header, ...lines].join('\n')
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
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]')
    const rows = JSON.parse(raw)
    const csv = toCsv(rows)

    const headers = new Headers()
    headers.set('Content-Type', 'text/csv; charset=utf-8')
    headers.set('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().slice(0,10)}.csv"`)

    return new NextResponse(csv, { status: 200, headers })
  } catch (err) {
    logger.error('Leads export failed', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    })
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
