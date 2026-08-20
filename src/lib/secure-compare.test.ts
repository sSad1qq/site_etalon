import { describe, expect, it } from 'vitest'
import { secureCompare } from './secure-compare'

describe('secureCompare', () => {
  it('accepts identical non-empty values', () => {
    expect(secureCompare('secret-value', 'secret-value')).toBe(true)
  })

  it('rejects different values and lengths without throwing', () => {
    expect(secureCompare('wrong', 'secret-value')).toBe(false)
    expect(secureCompare('secret-valuf', 'secret-value')).toBe(false)
  })

  it('rejects empty values', () => {
    expect(secureCompare('', '')).toBe(false)
  })
})
