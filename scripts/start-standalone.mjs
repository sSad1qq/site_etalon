import path from 'node:path'

process.env.LEADS_DATA_DIR ??= path.resolve(process.cwd(), 'data')

await import('../.next/standalone/server.js')
