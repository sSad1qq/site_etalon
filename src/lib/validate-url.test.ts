import { describe, expect, it } from 'vitest'
import { validateWebhookUrl } from './validate-url'

describe('validateWebhookUrl', () => {
  it('requires HTTPS and rejects URL credentials', async () => {
    await expect(validateWebhookUrl('http://8.8.8.8/hook'))
      .resolves.toMatchObject({ valid: false })
    await expect(validateWebhookUrl('https://user:password@8.8.8.8/hook'))
      .resolves.toMatchObject({ valid: false })
  })

  it.each([
    'https://127.0.0.1/hook',
    'https://10.0.0.1/hook',
    'https://169.254.169.254/hook',
    'https://192.168.1.1/hook',
    'https://224.0.0.1/hook',
    'https://[::1]/hook',
    'https://[::ffff:127.0.0.1]/hook',
  ])('rejects a non-public destination: %s', async url => {
    await expect(validateWebhookUrl(url)).resolves.toMatchObject({ valid: false })
  })

  it('accepts a public literal IP address', async () => {
    await expect(validateWebhookUrl('https://8.8.8.8/hook'))
      .resolves.toEqual({ valid: true })
  })
})
