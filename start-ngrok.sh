#!/usr/bin/env bash

# Скрипт для быстрого запуска сайта с Ngrok туннелем
# Использование: ./start-ngrok.sh

set -euo pipefail

echo "🚀 Запуск сайта с Ngrok туннелем..."
echo ""

# Проверяем, запущен ли Docker контейнер
if ! docker compose ps --status running --services | grep -qx "web"; then
    echo "📦 Запускаем Docker контейнер..."
    docker compose up -d --build
    echo "⏳ Ждем запуска контейнера..."
    sleep 5
else
    echo "✅ Docker контейнер уже запущен"
fi

# Проверяем, установлен ли ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ Ngrok не установлен!"
    echo ""
    echo "Установите Ngrok:"
    echo "  macOS: brew install ngrok/ngrok/ngrok"
    echo "  Или скачайте: https://ngrok.com/download"
    echo ""
    exit 1
fi

echo "🌐 Запускаем Ngrok туннель..."
echo ""
echo "📋 Публичный URL будет показан ниже:"
echo "   Скопируйте его и отправьте другому человеку"
echo ""
echo "⚠️  Нажмите Ctrl+C для остановки"
echo ""

# Запускаем ngrok
ngrok http 3000
