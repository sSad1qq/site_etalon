import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, subject, message, adminChatId, botToken } = body

    // Проверяем обязательные поля
    if (!name || !phone || !adminChatId || !botToken) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      )
    }

    // Форматируем телефон для отображения
    const formatPhone = (phone: string) => {
      // Убираем все нецифровые символы
      const cleanPhone = phone.replace(/\D/g, '')
      // Если номер начинается с 8, заменяем на 7
      const formattedPhone = cleanPhone.startsWith('8') ? '7' + cleanPhone.slice(1) : cleanPhone
      // Форматируем для отображения
      if (formattedPhone.length === 10) {
        return `+7 (${formattedPhone.slice(0, 3)}) ${formattedPhone.slice(3, 6)}-${formattedPhone.slice(6, 8)}-${formattedPhone.slice(8)}`
      }
      return `+7 ${formattedPhone}`
    }

    // Формируем сообщение для отправки
    const telegramMessage = `
🎓 *Новая заявка с сайта Эталон*

👤 *Имя:* ${name}
📞 *Телефон:* ${formatPhone(phone)}
${email ? `📧 *Email:* ${email}` : ''}
${subject ? `📚 *Предмет:* ${subject}` : ''}
${message ? `💬 *Сообщение:* ${message}` : ''}

⏰ *Время:* ${new Date().toLocaleString('ru-RU')}
🌐 *Источник:* etalon-penza.ru
    `.trim()

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: adminChatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      }
    )

    const telegramData = await telegramResponse.json()

    if (!telegramResponse.ok) {
      // Telegram API Error (логирование отключено для production)
      
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
        { 
          error: 'Ошибка отправки в Telegram', 
          details: telegramData.description || 'Неизвестная ошибка'
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена',
      telegramMessageId: telegramData.result?.message_id,
    })
  } catch {
    // Error sending to Telegram (логирование отключено для production)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
