import path from 'node:path'

export const LEADS_DATA_DIR = path.resolve(
  /* turbopackIgnore: true */
  process.env.LEADS_DATA_DIR ?? path.join(process.cwd(), 'data'),
)

export const LEADS_DATA_FILE = path.join(LEADS_DATA_DIR, 'leads.json')
