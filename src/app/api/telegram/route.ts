import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter, getClientIp } from '@/lib/rate-limit'
import { verifyCsrf } from '@/lib/csrf'
import { logger } from '@/lib/logger'
import { formatMoscowDateTime, formatRussianPhone } from '@/lib/contact-format'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 3 })

const MAX_NAME = 100
const MAX_PHONE = 20
const MAX_EMAIL = 254
const MAX_SUBJECT = 200
const MAX_MESSAGE = 1000

const NAME_RE = /^[а-яёА-ЯЁa-zA-Z\s-]{2,}$/
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/

export async function POST(request: NextRequest) {
  try {
    const csrf = verifyCsrf(request)
    if (!csrf.ok) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 },
      )
    }

    const ip = getClientIp(request)

    if (limiter.isLimited(ip)) {
      return NextResponse.json(
        { error: 'Слишком много запросов. Попробуйте позже.' },
        { status: 429 },
      )
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram не настроен на сервере' },
        { status: 500 }
      )
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Некорректное тело запроса' },
        { status: 400 }
      )
    }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || name.length > MAX_NAME || !NAME_RE.test(name)) {
      return NextResponse.json(
        { error: 'Некорректное имя' },
        { status: 400 }
      )
    }

    if (!phone || phone.length > MAX_PHONE || !PHONE_RE.test(phone)) {
      return NextResponse.json(
        { error: 'Некорректный телефон' },
        { status: 400 }
      )
    }

    if (email && (email.length > MAX_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json(
        { error: 'Некорректный email' },
        { status: 400 }
      )
    }

    if (subject.length > MAX_SUBJECT || message.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: 'Превышена максимальная длина поля' },
        { status: 400 }
      )
    }

    const sanitize = (s: string) =>
      s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200F\u2028-\u202F\uFEFF]/g, '')
    const esc = (s: string) =>
      sanitize(s).replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, '\\$&')

    const telegramMessage = `
🎓 *Новая заявка с сайта Эталон*

👤 *Имя:* ${esc(name)}
📞 *Телефон:* ${esc(formatRussianPhone(phone))}
${email ? `📧 *Email:* ${esc(email)}` : ''}
${subject ? `📚 *Предмет:* ${esc(subject)}` : ''}
${message ? `💬 *Сообщение:* ${esc(message)}` : ''}

⏰ *Время:* ${esc(formatMoscowDateTime())}
🌐 *Источник:* etalon\\-penza\\.ru
    `.trim()

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_ADMIN_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10_000),
      }
    )

    const telegramData = await telegramResponse.json()

    if (!telegramResponse.ok) {
      logger.error('Telegram API error', {
        status: telegramResponse.status,
        errorCode: telegramData.error_code,
        description: telegramData.description,
      })

      // Обработка специфических ошибок
      if (telegramData.error_code === 403) {
        if (telegramData.description?.includes("bot can't send messages to bots")) {
          return NextResponse.json(
            { error: 'Ошибка: Chat ID указывает на бота. Укажите ID пользователя, а не бота.' },
            { status: 400 }
          )
        } else if (telegramData.description?.includes("chat not found")) {
          return NextResponse.json(
            { error: 'Ошибка: Chat не найден. Убедитесь, что пользователь написал боту.' },
            { status: 400 }
          )
        }
      }
      
      return NextResponse.json(
        { error: 'Ошибка отправки в Telegram' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена',
      telegramMessageId: telegramData.result?.message_id,
    })
  } catch (err) {
    logger.error('Telegram route unhandled error', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    })
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
