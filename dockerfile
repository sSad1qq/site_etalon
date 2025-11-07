# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Этап запуска
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение из builder
# В standalone режиме Next.js автоматически включает public в standalone/.next/standalone/public
# Но нужно убедиться что public доступна в корне приложения
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Копируем public папку - она должна быть доступна в корне для Next.js Image компонента
# В standalone режиме public должна быть в корне приложения (где находится server.js)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]