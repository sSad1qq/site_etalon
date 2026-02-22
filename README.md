# Сайт образовательного центра "Эталон"

Современный, быстрый и SEO-оптимизированный сайт для образовательного центра подготовки к ЕГЭ и ОГЭ.

## 🚀 Технологии

- **Next.js 15** - React фреймворк для production
- **TypeScript** - типизация и безопасность кода
- **Tailwind CSS** - современные стили и адаптивный дизайн
- **React Hook Form** - управление формами
- **Telegram Bot API** - автоматическая отправка заявок
- **Яндекс.Карты** - интерактивная карта расположения

## 📋 Возможности

- ✅ Адаптивный дизайн (mobile-first)
- ✅ SEO-оптимизация (meta-теги, Open Graph, sitemap, robots.txt)
- ✅ Форма обратной связи с валидацией
- ✅ Интеграция с Telegram для получения заявок
- ✅ Сохранение заявок в JSON и возможность экспорта в CSV
- ✅ Интерактивная карта Яндекс с меткой офиса
- ✅ Кастомные анимации и эффекты
- ✅ Страницы: Главная, О центре, Предметы, FAQ, Контакты, Расположение

## 📦 Установка

### 1. Установите зависимости

```bash
npm install
```

### 2. Настройте переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
# Telegram Bot Configuration (обязательно для работы формы)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id_here

# Optional: External webhook для лидов
LEADS_WEBHOOK_URL=https://your-webhook-url.com
LEADS_WEBHOOK_TOKEN=your_optional_secret_token
```

**Важно:** Инструкция по созданию Telegram бота находится в файле `TELEGRAM_SETUP.md`

### 3. Обновите контактные данные

Найдите и замените placeholder'ы на реальные данные:

- **Телефоны**: `src/app/location/page.tsx` и `src/components/YandexMap.tsx`
- **Email**: `src/app/location/page.tsx`
- Ищите комментарий `TODO: Заменить на реальный номер телефона`

### 4. Запустите dev-сервер

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 🏗️ Сборка для production

```bash
npm run build
npm run start
```

## 📁 Структура проекта

```
site_etalon/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Главная страница
│   │   ├── about/              # Страница "О центре"
│   │   ├── contacts/           # Контакты
│   │   ├── faq/                # FAQ
│   │   ├── location/           # Расположение с картой
│   │   ├── subjects/           # Предметы
│   │   └── api/                # API routes
│   │       ├── lead/           # Сохранение заявок
│   │       ├── leads/export/   # Экспорт заявок в CSV
│   │       └── telegram/       # Отправка в Telegram
│   ├── components/             # React компоненты
│   └── styles/                 # Стили и темы
├── public/                     # Статические файлы
├── data/                       # База данных заявок (JSON)
└── TELEGRAM_SETUP.md           # Инструкция по настройке Telegram

```

## 📧 Работа с заявками

### Локальное хранение

Все заявки сохраняются в `data/leads.json`. Этот файл НЕ коммитится в git (см. `.gitignore`).

### Экспорт заявок

Скачать все заявки в CSV: `http://your-domain.com/api/leads/export`

### Telegram уведомления

При правильной настройке бота (см. `TELEGRAM_SETUP.md`), каждая заявка автоматически отправляется в Telegram.

### Webhook интеграция

Опционально можно настроить webhook для отправки заявок в CRM или Google Sheets:

```env
LEADS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
LEADS_WEBHOOK_TOKEN=your_secret_token
```

## 🌐 Деплой

### Vercel (рекомендуется)

1. Создайте аккаунт на [Vercel](https://vercel.com)
2. Подключите GitHub репозиторий
3. Добавьте переменные окружения в настройках проекта
4. Деплой произойдет автоматически

### Другие хостинги

Проект совместим с любым хостингом, поддерживающим Next.js:

- Netlify
- AWS Amplify
- Google Cloud Run
- Docker

## ✅ Чек-лист перед запуском

- [ ] Настроен Telegram бот
- [ ] Заменены тестовые телефоны на реальные
- [ ] Проверена форма обратной связи
- [ ] Добавлены переменные окружения на хостинге
- [ ] Проверена карта Яндекс
- [ ] Production build успешно собирается
- [ ] Проверены все ссылки на сайте

## 📞 Поддержка

При возникновении вопросов или проблем:

1. Проверьте `TELEGRAM_SETUP.md` для настройки бота
2. Проверьте консоль браузера на ошибки
3. Убедитесь, что все переменные окружения настроены

## 📄 Лицензия

Проект разработан для образовательного центра "Эталон".
