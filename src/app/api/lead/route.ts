import { NextResponse } from 'next/server'
import fs from 'fs/promises'

const DATA_DIR = `${process.cwd()}/data`
const DATA_FILE = `${DATA_DIR}/leads.json`

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await fs.mkdir(DATA_DIR, { recursive: true })
    const raw = await fs.readFile(DATA_FILE, 'utf-8').catch(() => '[]')
    const leads = JSON.parse(raw)

    const entry = {
      ...body,
      receivedAt: new Date().toISOString(),
    }

    leads.push(entry)
    await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8')

    // если задан внешний webhook, форвардим лид туда (не блокируем основную операцию)
    try {
      const webhook = process.env.LEADS_WEBHOOK_URL
      if (webhook) {
        const headers: Record<string,string> = { 'Content-Type': 'application/json' }
        const token = process.env.LEADS_WEBHOOK_TOKEN
        if (token) headers['Authorization'] = `Bearer ${token}`

        // fire-and-forget but await to catch errors in server logs
        const resp = await fetch(webhook, { method: 'POST', headers, body: JSON.stringify(entry) })
        if (!resp.ok) {
          const t = await resp.text().catch(() => '')
          console.error('Forwarding lead failed:', resp.status, t)
        }
      }
    } catch (ferr) {
      console.error('Forwarding lead error:', ferr)
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    // форматируем сообщение об ошибке без использования `any`
    const message = err instanceof Error ? err.message : String(err)
    console.error('API /api/lead error:', message)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
