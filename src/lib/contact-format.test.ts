import { describe, expect, it } from 'vitest'
import { formatMoscowDateTime, formatRussianPhone } from './contact-format'

describe('formatRussianPhone', () => {
  it.each([
    ['9123456789', '+7 (912) 345-67-89'],
    ['+7 (912) 345-67-89', '+7 (912) 345-67-89'],
    ['8 912 345 67 89', '+7 (912) 345-67-89'],
  ])('formats %s', (input, expected) => {
    expect(formatRussianPhone(input)).toBe(expected)
  })
})

describe('formatMoscowDateTime', () => {
  it('uses Moscow time regardless of the server timezone', () => {
    expect(formatMoscowDateTime(new Date('2026-01-01T00:00:00Z'))).toContain('03:00:00')
  })
})
