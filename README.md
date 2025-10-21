This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Приём лидов / Contact form

В проекте есть форма записи на бесплатную консультацию. По умолчанию она отправляет данные на локальный endpoint `/api/lead` и сохраняет заявки в `data/leads.json`.

Если вы хотите отправлять лиды на внешний сервис (например, Formspree), создайте файл `.env.local` в корне проекта и добавьте строку:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your_form_id
```

Если вы хотите, чтобы лиды сразу отправлялись в внешнюю систему (Google Sheets, CRM), можно указать переменную окружения в `.env.local`:

```
LEADS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
LEADS_WEBHOOK_TOKEN=your-secret-token-optional
```

Пример простого Google Apps Script (в качестве webhook):

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  // добавьте логику записи в таблицу или дальнейшей обработки
  return ContentService.createTextOutput(JSON.stringify({ ok: true }));
}
```

Наш сервер при наличии `LEADS_WEBHOOK_URL` форвардит каждый пришедший лид как POST JSON. Если `LEADS_WEBHOOK_TOKEN` задан — он будет передан в заголовке Authorization: Bearer <token>.

Пример файла `.env.example` добавлен в корень репозитория.
