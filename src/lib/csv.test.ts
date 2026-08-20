import { describe, expect, it } from 'vitest'
import { toCsv } from './csv'

describe('toCsv', () => {
  it('returns an empty string for an empty list', () => {
    expect(toCsv([])).toBe('')
  })

  it('escapes quotes and commas', () => {
    expect(toCsv([{ name: 'Иван, "Иваныч"', phone: '9123456789' }]))
      .toBe('name,phone\n"Иван, ""Иваныч""",9123456789')
  })

  it('neutralizes spreadsheet formulas', () => {
    expect(toCsv([{ name: '=HYPERLINK("https://example.com")' }]))
      .toBe('name\n"\'=HYPERLINK(""https://example.com"")"')
  })

  it('handles non-object rows without throwing', () => {
    expect(toCsv([{ name: 'Анна' }, null, 42])).toBe('name\nАнна\n\n')
  })
})
