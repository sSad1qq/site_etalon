# Публикация образа в Docker Hub

Публикация изменяет внешний реестр. Выполняйте её только после успешных локальных проверок и осознанного выбора тега версии.

## Подготовка

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
docker build -f dockerfile -t site-etalon:local .
```

Убедитесь, что Dockerfile не содержит `.env`, заявок или токенов. `.dockerignore` исключает локальные env-файлы, runtime-данные и исходные копии уже оптимизированных изображений.

## Публикация скриптом

```bash
docker login
./publish-dockerhub.sh <username> <version>
```

Пример:

```bash
./publish-dockerhub.sh myusername 0.1.0
```

Скрипт публикует указанный тег и обновляет `latest`. Не используйте `latest` вместо versioned tag для воспроизводимого production-развёртывания.

## Запуск опубликованного образа

```bash
docker run -d \
  --name site-etalon \
  --init \
  --security-opt no-new-privileges:true \
  -p 127.0.0.1:3000:3000 \
  -v etalon-data:/app/data \
  -e VK_BOT_TOKEN \
  -e VK_ADMIN_USER_ID \
  -e EXPORT_SECRET \
  myusername/site-etalon:0.1.0
```

Перед production-публикацией проверьте digest образа, настройте HTTPS reverse proxy и храните переменные окружения в secret manager платформы.
