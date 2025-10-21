import { NextResponse } from 'next/server'
import fs from 'fs/promises'

const DATA_FILE = `${process.cwd()}/data/leads.json`

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

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]')
    const rows = JSON.parse(raw)
    const csv = toCsv(rows)

    const headers = new Headers()
    headers.set('Content-Type', 'text/csv; charset=utf-8')
    headers.set('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().slice(0,10)}.csv"`)

    return new NextResponse(csv, { status: 200, headers })
  } catch (err) {
    console.error('Export leads error:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
