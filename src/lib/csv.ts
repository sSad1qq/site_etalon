function escapeCell(raw: unknown): string {
  let value = raw === undefined || raw === null ? '' : String(raw)

  // Spreadsheet applications may execute cells beginning with these characters.
  if (/^[=+\-@\t\r]/.test(value)) {
    value = `'${value}`
  }

  const escaped = value.replace(/"/g, '""')
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped
}

export function toCsv(rows: unknown[]): string {
  if (rows.length === 0) return ''

  const keys = Array.from(rows.reduce((result: Set<string>, row: unknown) => {
    if (typeof row === 'object' && row !== null && !Array.isArray(row)) {
      Object.keys(row).forEach(key => result.add(key))
    }
    return result
  }, new Set<string>()))

  if (keys.length === 0) return ''

  const header = keys.map(escapeCell).join(',')
  const lines = rows.map(row => {
    const record = typeof row === 'object' && row !== null && !Array.isArray(row)
      ? row as Record<string, unknown>
      : {}

    return keys.map(key => escapeCell(record[key])).join(',')
  })

  return [header, ...lines].join('\n')
}
