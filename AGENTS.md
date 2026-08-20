# Инструкции для coding agents

## Команды проверки

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Перед release-related изменениями выполняйте lint, typecheck, tests и production build.

## Архитектура

Проект — сайт образовательного центра «Эталон» на Next.js 16 App Router, React 19, TypeScript и Tailwind CSS.

- `src/app/` — страницы, metadata и API routes;
- `src/components/` — UI-компоненты;
- `src/lib/` — CSRF, rate limiting, SSRF-проверка, логирование и export utilities;
- `public/` — production-assets и юридические документы;
- `data/` — runtime-хранилище заявок с персональными данными, исключённое из Git.

## API routes

- `POST /api/vk` — основной канал уведомлений, который вызывает форма;
- `POST /api/lead` — локальное JSON-хранилище и необязательная HTTPS webhook-интеграция;
- `POST /api/telegram` — отдельный необязательный Telegram-канал;
- `GET /api/leads/export` — CSV-экспорт с авторизацией через `EXPORT_SECRET`.

Все изменяющие состояние routes проверяют `Origin`/`Referer` и ограничивают частоту запросов в памяти процесса. Webhook URL должен использовать HTTPS и разрешаться только в публичные адреса.

## Ограничения

- Не коммитьте env-файлы, токены, заявки, CSV-выгрузки и другие персональные данные.
- Не логируйте имена, телефоны, токены и полные webhook URL.
- Сохраняйте юридические страницы и связанные PDF-документы.
- Не ломайте standalone-сборку, используемую Docker.
- Не добавляйте `.next`, `node_modules` и `next-env.d.ts`.
- Не меняйте бизнес-тексты, статистику и контактные данные без подтверждённого источника.
- Файловое хранение заявок рассчитано только на один экземпляр приложения; перед горизонтальным масштабированием или serverless-развёртыванием нужен внешний storage adapter.
