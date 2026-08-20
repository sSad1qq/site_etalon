import crypto from 'node:crypto'

export function secureCompare(suppliedValue: string, expectedValue: string): boolean {
  if (!suppliedValue || !expectedValue) return false

  const supplied = Buffer.from(suppliedValue, 'utf8')
  const expected = Buffer.from(expectedValue, 'utf8')
  if (supplied.length !== expected.length) return false

  return crypto.timingSafeEqual(supplied, expected)
}
