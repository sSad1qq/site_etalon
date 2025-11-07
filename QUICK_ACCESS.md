# 🚀 Быстрый доступ через интернет

## Самый простой способ (Ngrok) ⭐

### 1. Установите Ngrok

**macOS:**
```bash
brew install ngrok/ngrok/ngrok
```

**Или скачайте:** https://ngrok.com/download

### 2. Запустите скрипт

```bash
./start-ngrok.sh
```

Или вручную:

```bash
# 1. Запустите Docker
docker-compose up -d

# 2. Запустите Ngrok
ngrok http 3000
```

### 3. Получите URL

Ngrok покажет что-то вроде:
```
Forwarding: https://abc123.ngrok-free.app -> http://localhost:3000
```

**Отправьте этот URL другому человеку:** `https://abc123.ngrok-free.app`

---

## Альтернативные способы

### Cloudflare Tunnel (бесплатно, безопасно)

```bash
# Установка
brew install cloudflare/cloudflare/cloudflared

# Запуск
cloudflared tunnel --url http://localhost:3000
```

### Serveo (без установки)

```bash
ssh -R 80:localhost:3000 serveo.net
```

---

## 📖 Подробные инструкции

См. файл `ACCESS.md` для полной документации.

