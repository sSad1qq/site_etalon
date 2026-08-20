# Запуск в Docker

## Требования

- Docker Engine с Compose v2;
- заполненные серверные переменные окружения.

## Быстрый старт

```bash
cp .env_example .env
```

Заполните как минимум `VK_BOT_TOKEN` и `VK_ADMIN_USER_ID`. Для экспорта заявок также задайте случайный `EXPORT_SECRET`:

```bash
openssl rand -hex 32
```

Необязательный `NEXT_PUBLIC_YANDEX_MAPS_API_KEY` передаётся в Docker как build argument. После его изменения пересоберите образ.

Запустите приложение:

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f web
```

По умолчанию порт доступен только на `http://127.0.0.1:3000`. Это безопасный вариант для локальной работы и reverse proxy.

Для доступа из доверенной локальной сети измените в `.env`:

```env
HOST_BIND_ADDRESS=0.0.0.0
HOST_PORT=3000
```

Не публикуйте контейнер напрямую в интернет без HTTPS, reverse proxy и ограничений доступа.

## Хранение заявок

Compose использует volume `etalon-data` для `/app/data`. Он сохраняется при пересоздании контейнера и содержит персональные данные.

В образе `LEADS_DATA_DIR` явно закреплён как `/app/data`; не переопределяйте его на путь вне подключённого volume.

Просмотреть имя volume:

```bash
docker volume ls
```

Не добавляйте содержимое volume в Git, образы или публичные резервные копии. Перед удалением volume убедитесь, что нужные данные перенесены в защищённое хранилище.

## Обновление и остановка

```bash
docker compose build --pull
docker compose up -d
docker compose down
```

Команда `docker compose down` не удаляет volume. Не используйте флаг `--volumes`, если не намерены удалить заявки.

## Проверка образа

```bash
docker build -f dockerfile -t site-etalon:local .
docker run --rm -p 127.0.0.1:3000:3000 \
  -e VK_BOT_TOKEN=test \
  -e VK_ADMIN_USER_ID=1 \
  site-etalon:local
```

Сборка выполняется от Node.js 20, а приложение запускается от непривилегированного пользователя.
