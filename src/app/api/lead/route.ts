import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import { createRateLimiter, getClientIp } from '@/lib/rate-limit'
import { validateWebhookUrl } from '@/lib/validate-url'
import { verifyCsrf } from '@/lib/csrf'
import { logger } from '@/lib/logger'

const DATA_DIR = `${process.cwd()}/data`
const DATA_FILE = `${DATA_DIR}/leads.json`

const MAX_LEADS = 50_000
const MAX_NAME_LENGTH = 100
const MAX_PHONE_LENGTH = 15

const NAME_RE = /^[а-яёА-ЯЁa-zA-Z\s-]{2,}$/
const PHONE_RE = /^[489]\d{9}$/

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 5 })

// ── Валидация тела запроса ─────────────────────────────────────────
interface LeadBody {
  name: string
  phone: string
}

function validateBody(raw: unknown): { data?: LeadBody; error?: string } {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return { error: 'Invalid body' }
  }

  const obj = raw as Record<string, unknown>
  const name = typeof obj.name === 'string' ? obj.name.trim() : ''
  const phone = typeof obj.phone === 'string' ? obj.phone.trim() : ''

  if (!name || name.length > MAX_NAME_LENGTH || !NAME_RE.test(name)) {
    return { error: 'Invalid name' }
  }
  if (!phone || phone.length > MAX_PHONE_LENGTH || !PHONE_RE.test(phone)) {
    return { error: 'Invalid phone' }
  }

  return { data: { name, phone } }
}

// ── Обработчик ─────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const csrf = verifyCsrf(req)
    if (!csrf.ok) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden' },
        { status: 403 },
      )
    }

    const ip = getClientIp(req)

    if (limiter.isLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests' },
        { status: 429 },
      )
    }

    const body = await req.json().catch(() => null)
    const { data, error } = validateBody(body)
    if (!data) {
      return NextResponse.json({ ok: false, error }, { status: 400 })
    }

    await fs.mkdir(DATA_DIR, { recursive: true })
    const raw = await fs.readFile(DATA_FILE, 'utf-8').catch(() => '[]')
    const leads: unknown[] = JSON.parse(raw)

    if (leads.length >= MAX_LEADS) {
      return NextResponse.json(
        { ok: false, error: 'Storage limit reached' },
        { status: 507 },
      )
    }

    const entry = {
      name: data.name,
      phone: data.phone,
      receivedAt: new Date().toISOString(),
    }

    leads.push(entry)
    await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8')

    try {
      const webhook = process.env.LEADS_WEBHOOK_URL
      if (webhook) {
        const { valid, reason } = await validateWebhookUrl(webhook)
        if (!valid) {
          console.error(`SSRF protection: webhook URL rejected — ${reason}`)
        } else {
          const headers: Record<string, string> = { 'Content-Type': 'application/json' }
          const token = process.env.LEADS_WEBHOOK_TOKEN
          if (token) headers['Authorization'] = `Bearer ${token}`

          const resp = await fetch(webhook, {
            method: 'POST',
            headers,
            body: JSON.stringify(entry),
            signal: AbortSignal.timeout(10_000),
          })
          if (!resp.ok) {
            logger.error('Webhook forward failed', {
              status: resp.status,
              url: webhook,
            })
          }
        }
      }
    } catch (err) {
      logger.error('Webhook forward error', {
        error: err instanceof Error ? err.message : String(err),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
