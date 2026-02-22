# 🐳 Инструкция по развертыванию в Docker

## 📋 Что было настроено

✅ `next.config.ts` - добавлен `output: 'standalone'`  
✅ `Dockerfile` - многостадийная сборка для production  
✅ `.dockerignore` - исключение ненужных файлов  
✅ `docker-compose.yml` - удобный запуск с переменными окружения  

## 🚀 Быстрый старт

### Вариант 1: Docker Compose (рекомендуется)

#### 1. Настройте переменные окружения

Создайте файл `.env` в корне проекта (или используйте существующий `.env.local`):

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id_here
LEADS_WEBHOOK_URL=
LEADS_WEBHOOK_TOKEN=
```

#### 2. Запустите контейнер

```bash
# Сборка и запуск
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

#### 3. Проверьте работу

Откройте в браузере: `http://localhost:3000`

---

## 🌐 Доступ извне (для других пользователей)

### Настройка для доступа из локальной сети

Docker уже настроен для доступа извне (`0.0.0.0:3000:3000`). Чтобы другой человек мог просмотреть сайт:

#### 1. Узнайте IP адрес вашего компьютера

**macOS/Linux:**
```bash
# Узнать локальный IP адрес
ifconfig | grep "inet " | grep -v 127.0.0.1

# Или проще:
ipconfig getifaddr en0  # macOS
hostname -I | awk '{print $1}'  # Linux
```

**Windows:**
```cmd
ipconfig
# Найдите IPv4 адрес (например, 192.168.1.100)
```

#### 2. Проверьте firewall

**macOS:**
```bash
# Проверить статус firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Если нужно открыть порт 3000
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblockapp /usr/local/bin/node
```

**Linux (ufw):**
```bash
# Открыть порт 3000
sudo ufw allow 3000/tcp
sudo ufw status
```

**Windows:**
- Откройте "Брандмауэр Защитника Windows"
- Разрешите порт 3000 для входящих подключений

#### 3. Подключение другого пользователя

**В локальной сети (WiFi/LAN):**
- Другой человек должен быть в той же сети
- Откройте в браузере: `http://ВАШ_IP_АДРЕС:3000`
- Например: `http://192.168.1.100:3000`

**Через интернет (если есть публичный IP):**
- Нужен публичный IP адрес или настройка port forwarding на роутере
- Откройте в браузере: `http://ВАШ_ПУБЛИЧНЫЙ_IP:3000`

#### 4. Проверка доступности

```bash
# Проверить, что порт открыт (с другого компьютера)
curl http://ВАШ_IP_АДРЕС:3000

# Или просто откройте в браузере на другом устройстве
```

### Изменение порта (если 3000 занят)

Если порт 3000 занят, измените в `docker-compose.yml`:

```yaml
ports:
  - "0.0.0.0:8080:3000"  # Внешний порт:внутренний порт
```

Тогда доступ будет: `http://ВАШ_IP:8080`

---

### Вариант 2: Docker напрямую

#### 1. Соберите образ

```bash
docker build -t site-etalon .
```

#### 2. Запустите контейнер

```bash
docker run -d \
  -p 0.0.0.0:3000:3000 \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e TELEGRAM_ADMIN_CHAT_ID=your_chat_id \
  -v $(pwd)/data:/app/data \
  --name site-etalon \
  --restart unless-stopped \
  site-etalon
```

**Примечание:** `-p 0.0.0.0:3000:3000` позволяет другим пользователям подключаться к сайту через ваш IP адрес.

#### 3. Просмотр логов

```bash
docker logs -f site-etalon
```

#### 4. Остановка

```bash
docker stop site-etalon
docker rm site-etalon
```

---

## 🔧 Полезные команды

### Docker Compose

```bash
# Пересобрать образ
docker-compose build --no-cache

# Перезапустить контейнер
docker-compose restart

# Просмотр статуса
docker-compose ps

# Просмотр логов последних 100 строк
docker-compose logs --tail=100

# Выполнить команду внутри контейнера
docker-compose exec web sh
```

### Docker напрямую

```bash
# Просмотр запущенных контейнеров
docker ps

# Просмотр всех контейнеров
docker ps -a

# Просмотр образов
docker images

# Удаление образа
docker rmi site-etalon

# Выполнить команду внутри контейнера
docker exec -it site-etalon sh
```

---

## 📦 Структура Docker образа

### Multi-stage build:

1. **deps** - установка зависимостей
2. **builder** - сборка Next.js приложения
3. **runner** - финальный образ с минимальным размером

### Что включено в образ:

- ✅ Скомпилированное Next.js приложение
- ✅ Статические файлы из `/public`
- ✅ Node.js runtime
- ✅ Минимальный Alpine Linux

### Что НЕ включено:

- ❌ Исходный код
- ❌ node_modules (только production зависимости)
- ❌ Dev зависимости
- ❌ Файлы из `.dockerignore`

---

## 🔒 Безопасность

- ✅ Приложение запускается от пользователя `nextjs` (не root)
- ✅ Минимальный образ на базе Alpine Linux
- ✅ Только production зависимости
- ✅ Переменные окружения передаются через environment

---

## 📊 Мониторинг

### Healthcheck

Docker Compose автоматически проверяет здоровье контейнера каждые 30 секунд.

### Логи

```bash
# Последние логи
docker-compose logs --tail=50

# Логи в реальном времени
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs web
```

---

## 🐛 Troubleshooting

### Проблема: Контейнер не запускается

**Решение:**
```bash
# Проверьте логи
docker-compose logs web

# Проверьте переменные окружения
docker-compose config
```

### Проблема: Ошибка "Cannot find module"

**Решение:**
```bash
# Пересоберите образ без кэша
docker-compose build --no-cache
docker-compose up -d
```

### Проблема: Порт 3000 уже занят

**Решение:**
Измените порт в `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Внешний порт:внутренний порт
```

### Проблема: Переменные окружения не работают

**Решение:**
1. Убедитесь, что файл `.env` существует в корне проекта
2. Проверьте синтаксис переменных (без пробелов вокруг `=`)
3. Перезапустите контейнер: `docker-compose restart`

---

## 📝 Production deployment

### На сервере

1. Скопируйте проект на сервер
2. Создайте `.env` файл с production переменными
3. Запустите:
   ```bash
   docker-compose up -d --build
   ```

### С Nginx (reverse proxy)

Пример конфигурации Nginx:

```nginx
server {
    listen 80;
    server_name etalon-penza.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ✅ Чек-лист перед запуском

- [ ] Переменные окружения настроены (`.env` или через `-e`)
- [ ] Telegram бот создан и настроен
- [ ] Порт 3000 свободен (или изменен в docker-compose.yml)
- [ ] Папка `data` существует (для сохранения заявок)
- [ ] Production build проходит успешно: `npm run build`

---

## 🎯 Готово!

Ваш сайт готов к развертыванию в Docker! 🚀

Для запуска выполните:
```bash
docker-compose up -d --build
```

Сайт будет доступен по адресу: `http://localhost:3000`

