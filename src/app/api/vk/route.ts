import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter, getClientIp } from '@/lib/rate-limit'
import { verifyCsrf } from '@/lib/csrf'
import { logger } from '@/lib/logger'

const VK_BOT_TOKEN = process.env.VK_BOT_TOKEN
const VK_ADMIN_USER_ID = process.env.VK_ADMIN_USER_ID
const VK_API_VERSION = '5.131'

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 3 })

const MAX_NAME = 100
const MAX_PHONE = 20
const MAX_EMAIL = 254
const MAX_SUBJECT = 200
const MAX_MESSAGE = 1000

const NAME_RE = /^[а-яёА-ЯЁa-zA-Z\s-]{2,}$/
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/

function sanitize(s: string): string {
  return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200F\u2028-\u202F\uFEFF]/g, '')
}

function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '')
  const normalized = clean.startsWith('8') ? '7' + clean.slice(1) : clean
  if (normalized.length === 10) {
    return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6, 8)}-${normalized.slice(8)}`
  }
  return `+7 ${normalized}`
}

export async function POST(request: NextRequest) {
  try {
    const csrf = verifyCsrf(request)
    if (!csrf.ok) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const ip = getClientIp(request)
    if (limiter.isLimited(ip)) {
      return NextResponse.json(
        { error: 'Слишком много запросов. Попробуйте позже.' },
        { status: 429 },
      )
    }

    if (!VK_BOT_TOKEN || !VK_ADMIN_USER_ID) {
      return NextResponse.json(
        { error: 'VK не настроен на сервере' },
        { status: 500 },
      )
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Некорректное тело запроса' }, { status: 400 })
    }

    const name    = typeof body.name    === 'string' ? body.name.trim()    : ''
    const phone   = typeof body.phone   === 'string' ? body.phone.trim()   : ''
    const email   = typeof body.email   === 'string' ? body.email.trim()   : ''
    const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || name.length > MAX_NAME || !NAME_RE.test(name)) {
      return NextResponse.json({ error: 'Некорректное имя' }, { status: 400 })
    }

    if (!phone || phone.length > MAX_PHONE || !PHONE_RE.test(phone)) {
      return NextResponse.json({ error: 'Некорректный телефон' }, { status: 400 })
    }

    if (email && (email.length > MAX_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: 'Некорректный email' }, { status: 400 })
    }

    if (subject.length > MAX_SUBJECT || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: 'Превышена максимальная длина поля' }, { status: 400 })
    }

    const lines = [
      '🎓 Новая заявка с сайта Эталон',
      '',
      `👤 Имя: ${sanitize(name)}`,
      `📞 Телефон: ${sanitize(formatPhone(phone))}`,
      ...(email   ? [`📧 Email: ${sanitize(email)}`]   : []),
      ...(subject ? [`📚 Предмет: ${sanitize(subject)}`] : []),
      ...(message ? [`💬 Сообщение: ${sanitize(message)}`] : []),
      '',
      `⏰ Время: ${new Date().toLocaleString('ru-RU')}`,
      '🌐 Источник: etalon-penza.ru',
    ]
    const vkMessage = lines.join('\n')

    const params = new URLSearchParams({
      peer_id:      VK_ADMIN_USER_ID,
      message:      vkMessage,
      random_id:    String(Math.floor(Math.random() * 2_147_483_647) + 1),
      access_token: VK_BOT_TOKEN,
      v:            VK_API_VERSION,
    })

    const vkResponse = await fetch(
      `https://api.vk.com/method/messages.send?${params.toString()}`,
      { method: 'POST' },
    )

    const vkData = await vkResponse.json()

    if (vkData.error) {
      logger.error('VK API error', {
        errorCode: vkData.error.error_code,
        errorMsg:  vkData.error.error_msg,
      })

      const code = vkData.error.error_code
      const msg  = vkData.error.error_msg ?? ''

      if (code === 901 || msg.includes("Can't send messages for users without permission")) {
        return NextResponse.json(
          { error: 'Ошибка: пользователь не написал сообществу. Администратор должен начать диалог с сообществом ВКонтакте.' },
          { status: 400 },
        )
      }

      if (code === 7 || msg.includes('Permission to perform this action is denied')) {
        return NextResponse.json(
          { error: 'Ошибка: токен не имеет разрешения на отправку сообщений. Проверьте права Community Access Token.' },
          { status: 400 },
        )
      }

      return NextResponse.json(
        { error: 'Ошибка отправки в VK', details: msg || 'Неизвестная ошибка' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена',
      vkMessageId: vkData.response,
    })
  } catch (err) {
    logger.error('VK route unhandled error', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    })
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
