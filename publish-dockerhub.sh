#!/bin/bash

# Скрипт для публикации образа на Docker Hub
# Использование: ./publish-dockerhub.sh [username] [tag]

set -e

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Получаем имя пользователя Docker Hub
DOCKER_USERNAME=${1:-""}
IMAGE_NAME="site-etalon"
TAG=${2:-"latest"}

if [ -z "$DOCKER_USERNAME" ]; then
    echo -e "${RED}Ошибка: Не указано имя пользователя Docker Hub${NC}"
    echo ""
    echo "Использование:"
    echo "  ./publish-dockerhub.sh <username> [tag]"
    echo ""
    echo "Примеры:"
    echo "  ./publish-dockerhub.sh myusername"
    echo "  ./publish-dockerhub.sh myusername v1.0.0"
    exit 1
fi

FULL_IMAGE_NAME="${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"

echo -e "${YELLOW}🐳 Публикация образа на Docker Hub${NC}"
echo ""
echo "Имя пользователя: ${DOCKER_USERNAME}"
echo "Имя образа: ${IMAGE_NAME}"
echo "Тег: ${TAG}"
echo "Полное имя: ${FULL_IMAGE_NAME}"
echo ""

# Проверяем, авторизован ли пользователь
if ! docker info | grep -q "Username"; then
    echo -e "${YELLOW}⚠️  Вы не авторизованы в Docker Hub${NC}"
    echo "Выполните: docker login"
    read -p "Хотите войти сейчас? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker login
    else
        echo -e "${RED}Отменено${NC}"
        exit 1
    fi
fi

# Собираем образ
echo -e "${GREEN}📦 Сборка образа...${NC}"
docker build -t "${FULL_IMAGE_NAME}" -f dockerfile .

# Также создаем тег latest, если указан другой тег
if [ "$TAG" != "latest" ]; then
    echo -e "${GREEN}📦 Создание тега latest...${NC}"
    docker tag "${FULL_IMAGE_NAME}" "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
fi

# Публикуем образ
echo -e "${GREEN}🚀 Публикация образа на Docker Hub...${NC}"
docker push "${FULL_IMAGE_NAME}"

if [ "$TAG" != "latest" ]; then
    echo -e "${GREEN}🚀 Публикация тега latest...${NC}"
    docker push "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
fi

echo ""
echo -e "${GREEN}✅ Образ успешно опубликован!${NC}"
echo ""
echo "Использование образа:"
echo "  docker pull ${FULL_IMAGE_NAME}"
echo ""
echo "Запуск образа:"
echo "  docker run -d -p 3000:3000 ${FULL_IMAGE_NAME}"
echo ""

