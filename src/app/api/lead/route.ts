import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import { randomUUID } from 'node:crypto'
import { createRateLimiter, getClientIp } from '@/lib/rate-limit'
import { validateWebhookUrl } from '@/lib/validate-url'
import { verifyCsrf } from '@/lib/csrf'
import { logger } from '@/lib/logger'
import { LEADS_DATA_DIR, LEADS_DATA_FILE } from '@/lib/lead-storage-path'

const MAX_LEADS = 50_000
const MAX_NAME_LENGTH = 100
const MAX_PHONE_LENGTH = 15

const NAME_RE = /^[а-яёА-ЯЁa-zA-Z\s-]{2,}$/
const PHONE_RE = /^[489]\d{9}$/

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 5 })
let storageQueue: Promise<void> = Promise.resolve()

// ── Валидация тела запроса ─────────────────────────────────────────
interface LeadBody {
  name: string
  phone: string
}

interface LeadEntry extends LeadBody {
  receivedAt: string
}

async function saveLead(entry: LeadEntry): Promise<boolean> {
  const operation = storageQueue.then(async () => {
    await fs.mkdir(LEADS_DATA_DIR, { recursive: true, mode: 0o700 })
    await fs.chmod(LEADS_DATA_DIR, 0o700)

    const raw = await fs.readFile(LEADS_DATA_FILE, 'utf-8').catch(() => '[]')
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error('Lead storage must contain a JSON array')
    }

    if (parsed.length >= MAX_LEADS) return false

    parsed.push(entry)
    const tempFile = `${LEADS_DATA_FILE}.${process.pid}.${randomUUID()}.tmp`

    try {
      await fs.writeFile(tempFile, JSON.stringify(parsed, null, 2), {
        encoding: 'utf-8',
        mode: 0o600,
      })
      await fs.rename(tempFile, LEADS_DATA_FILE)
      await fs.chmod(LEADS_DATA_FILE, 0o600)
    } finally {
      await fs.rm(tempFile, { force: true })
    }

    return true
  })

  storageQueue = operation.then(() => undefined, () => undefined)
  return operation
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

    const entry = {
      name: data.name,
      phone: data.phone,
      receivedAt: new Date().toISOString(),
    }

    if (!await saveLead(entry)) {
      return NextResponse.json(
        { ok: false, error: 'Storage limit reached' },
        { status: 507 },
      )
    }

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
            logger.error('Webhook forward failed', { status: resp.status })
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
    logger.error('Lead storage failed', {
      error: err instanceof Error ? err.message : String(err),
    })
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
