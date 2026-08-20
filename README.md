# Сайт образовательного центра «Эталон»

[![CI](https://github.com/sSad1qq/site_etalon/actions/workflows/ci.yml/badge.svg)](https://github.com/sSad1qq/site_etalon/actions/workflows/ci.yml)

Открытый исходный код сайта образовательного центра «Эталон» в Пензе. Проект помогает знакомиться с программами подготовки к ЕГЭ и ОГЭ и отправлять заявку на консультацию.

Рабочий сайт: [etalon-penza.ru](https://etalon-penza.ru)

## Возможности

- адаптивные страницы центра, предметов, FAQ и контактов;
- SEO-метаданные, sitemap, robots.txt и JSON-LD;
- форма заявки с серверной валидацией, CSRF-проверкой и ограничением частоты запросов;
- уведомления о заявках через VK Bot API;
- локальное хранение заявок и защищённый экспорт в CSV;
- опциональная отправка заявок во внешний webhook;
- Docker-сборка для самостоятельного развёртывания.

## Технологии

- Next.js 16 и React 19;
- TypeScript;
- Tailwind CSS;
- React Hook Form.

## Быстрый старт

Понадобятся Node.js 20.9 или новее и npm.

```bash
git clone https://github.com/sSad1qq/site_etalon.git
cd site_etalon
npm ci
cp .env_example .env.local
npm run dev
```

После запуска сайт будет доступен по адресу [http://localhost:3000](http://localhost:3000).

## Настройка окружения

Форма сайта отправляет уведомления через VK. Заполните в `.env.local`:

```env
VK_BOT_TOKEN=
VK_ADMIN_USER_ID=
EXPORT_SECRET=

# Необязательно
LEADS_WEBHOOK_URL=
LEADS_WEBHOOK_TOKEN=
ALLOWED_ORIGINS=
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=

# Необязательный отдельный Telegram API route
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
```

`NEXT_PUBLIC_YANDEX_MAPS_API_KEY` необязателен: без него на странице контактов отображается ссылка на адрес вместо интерактивной карты. Значение встраивается во время сборки, поэтому после его изменения нужно пересобрать приложение или Docker-образ. Подробная инструкция по VK находится в [VK_SETUP.md](VK_SETUP.md). В проекте также сохранён отдельный Telegram API route; его настройка описана в [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md), но текущая форма сайта вызывает VK route.

Никогда не коммитьте `.env`, `.env.local`, токены, выгрузки заявок или другие персональные данные.

## Проверка изменений

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Эти же проверки запускаются в GitHub Actions для push в `main` и pull request.

## Структура

```text
src/app/          страницы и API routes Next.js
src/components/   React-компоненты
src/lib/          CSRF, rate limiting, логирование и проверка webhook URL
src/styles/       общая тема
public/           статические изображения и документы
scripts/          вспомогательные локальные скрипты
data/             runtime-хранилище заявок, не входит в Git
```

Правила для coding agents находятся в [AGENTS.md](AGENTS.md).

## Данные и безопасность

Локальные заявки создаются в `data/leads.json`. Каталог `data/` исключён из Git, потому что содержит персональные данные. Экспорт CSV требует `Authorization: Bearer <EXPORT_SECRET>`.

Команда `npm start` сохраняет данные в корневой `data/`, а Docker использует `/app/data` с подключённым volume. Для другого окружения путь можно переопределить абсолютной серверной переменной `LEADS_DATA_DIR`.

Файловое хранилище рассчитано на один постоянно работающий сервер или Docker-контейнер. Для serverless-платформ и нескольких экземпляров приложения нужен внешний database/storage adapter.

Webhook принимает только HTTPS URL и отклоняет локальные, приватные и metadata-адреса.

О найденных уязвимостях сообщайте по инструкции в [SECURITY.md](SECURITY.md), а не через публичный issue.

## Участие в разработке

Предложения и исправления приветствуются. Перед первым pull request прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) и [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Направление развития проекта описано в [ROADMAP.md](ROADMAP.md).

## Лицензия

Исходный код распространяется по лицензии [MIT](LICENSE). Перед повторным использованием фотографий, логотипа и других брендовых материалов убедитесь, что у вас есть необходимые права.
