import { afterEach, describe, expect, it } from 'vitest'
import { verifyCsrf } from './csrf'

const originalAllowedOrigins = process.env.ALLOWED_ORIGINS

afterEach(() => {
  if (originalAllowedOrigins === undefined) {
    delete process.env.ALLOWED_ORIGINS
  } else {
    process.env.ALLOWED_ORIGINS = originalAllowedOrigins
  }
})

describe('verifyCsrf', () => {
  it('accepts a same-host origin', () => {
    const request = new Request('https://etalon-penza.ru/api/lead', {
      headers: {
        host: 'etalon-penza.ru',
        origin: 'https://etalon-penza.ru',
      },
    })

    expect(verifyCsrf(request)).toEqual({ ok: true })
  })

  it('rejects a mismatched or missing origin', () => {
    const mismatched = new Request('https://etalon-penza.ru/api/lead', {
      headers: {
        host: 'etalon-penza.ru',
        origin: 'https://example.com',
      },
    })
    const missing = new Request('https://etalon-penza.ru/api/lead', {
      headers: { host: 'etalon-penza.ru' },
    })

    expect(verifyCsrf(mismatched).ok).toBe(false)
    expect(verifyCsrf(missing).ok).toBe(false)
  })

  it('accepts an explicitly allowed origin', () => {
    process.env.ALLOWED_ORIGINS = 'https://preview.etalon-penza.ru'
    const request = new Request('https://etalon-penza.ru/api/lead', {
      headers: {
        host: 'etalon-penza.ru',
        origin: 'https://preview.etalon-penza.ru',
      },
    })

    expect(verifyCsrf(request)).toEqual({ ok: true })
  })

  it('does not let an allowed same-host entry authorize another origin', () => {
    process.env.ALLOWED_ORIGINS = 'https://etalon-penza.ru'
    const request = new Request('https://etalon-penza.ru/api/lead', {
      headers: {
        host: 'etalon-penza.ru',
        origin: 'https://attacker.example',
      },
    })

    expect(verifyCsrf(request)).toEqual({ ok: false, reason: 'Origin mismatch' })
  })

  it('compares ports for same-host requests', () => {
    const request = new Request('http://localhost:3000/api/lead', {
      headers: {
        host: 'localhost:3000',
        origin: 'http://localhost:4000',
      },
    })

    expect(verifyCsrf(request)).toEqual({ ok: false, reason: 'Origin mismatch' })
  })

  it('accepts a same-host referer when Origin is absent', () => {
    const request = new Request('https://etalon-penza.ru/api/lead', {
      headers: {
        host: 'etalon-penza.ru',
        referer: 'https://etalon-penza.ru/contacts',
      },
    })

    expect(verifyCsrf(request)).toEqual({ ok: true })
  })
})
