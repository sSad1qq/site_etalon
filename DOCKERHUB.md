# 🐳 Публикация на Docker Hub

Инструкция по публикации образа сайта на Docker Hub.

## 📋 Предварительные требования

1. **Аккаунт на Docker Hub**
   - Зарегистрируйтесь на [hub.docker.com](https://hub.docker.com)
   - Запомните ваше имя пользователя (username)

2. **Docker установлен и запущен**
   - Проверьте: `docker --version`
   - Docker должен быть запущен

## 🚀 Быстрая публикация

### Вариант 1: Использование скрипта (рекомендуется)

1. **Сделайте скрипт исполняемым:**
   ```bash
   chmod +x publish-dockerhub.sh
   ```

2. **Запустите скрипт:**
   ```bash
   ./publish-dockerhub.sh <ваш_username>
   ```
   
   Например:
   ```bash
   ./publish-dockerhub.sh myusername
   ```

3. **С указанием тега:**
   ```bash
   ./publish-dockerhub.sh myusername v1.0.0
   ```

Скрипт автоматически:
- ✅ Проверит авторизацию в Docker Hub
- ✅ Соберет образ
- ✅ Опубликует его на Docker Hub

---

### Вариант 2: Ручная публикация

#### 1. Войдите в Docker Hub

```bash
docker login
```

Введите ваши учетные данные:
- Username: ваш_username
- Password: ваш_пароль

#### 2. Соберите образ с тегом Docker Hub

Формат тега: `username/image-name:tag`

```bash
# Замените YOUR_USERNAME на ваше имя пользователя Docker Hub
docker build -t YOUR_USERNAME/site-etalon:latest -f dockerfile .
```

Например:
```bash
docker build -t myusername/site-etalon:latest -f dockerfile .
```

#### 3. Опубликуйте образ

```bash
docker push YOUR_USERNAME/site-etalon:latest
```

Например:
```bash
docker push myusername/site-etalon:latest
```

#### 4. Публикация с версией

Для версионирования образа:

```bash
# Сборка с версией
docker build -t myusername/site-etalon:v1.0.0 -f dockerfile .
docker tag myusername/site-etalon:v1.0.0 myusername/site-etalon:latest

# Публикация обеих версий
docker push myusername/site-etalon:v1.0.0
docker push myusername/site-etalon:latest
```

---

## 📥 Использование опубликованного образа

После публикации другие пользователи могут использовать ваш образ:

### Запуск образа

```bash
docker run -d \
  -p 3000:3000 \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e TELEGRAM_ADMIN_CHAT_ID=your_chat_id \
  --name site-etalon \
  YOUR_USERNAME/site-etalon:latest
```

### Использование в docker-compose.yml

Создайте файл `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  web:
    image: YOUR_USERNAME/site-etalon:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_ADMIN_CHAT_ID=${TELEGRAM_ADMIN_CHAT_ID}
    restart: unless-stopped
```

Запуск:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔄 Обновление образа

При изменении кода:

1. **Пересоберите образ:**
   ```bash
   docker build -t YOUR_USERNAME/site-etalon:latest -f dockerfile .
   ```

2. **Опубликуйте обновление:**
   ```bash
   docker push YOUR_USERNAME/site-etalon:latest
   ```

3. **На сервере обновите образ:**
   ```bash
   docker pull YOUR_USERNAME/site-etalon:latest
   docker-compose -f docker-compose.prod.yml up -d
   ```

---

## 🏷️ Версионирование

Рекомендуется использовать семантическое версионирование:

```bash
# Версия 1.0.0
docker build -t myusername/site-etalon:v1.0.0 -f dockerfile .
docker tag myusername/site-etalon:v1.0.0 myusername/site-etalon:latest
docker push myusername/site-etalon:v1.0.0
docker push myusername/site-etalon:latest

# Патч-версия 1.0.1
docker build -t myusername/site-etalon:v1.0.1 -f dockerfile .
docker tag myusername/site-etalon:v1.0.1 myusername/site-etalon:latest
docker push myusername/site-etalon:v1.0.1
docker push myusername/site-etalon:latest
```

---

## 🔒 Безопасность

### Публичные vs Приватные репозитории

- **Публичный репозиторий** (по умолчанию): любой может скачать образ
- **Приватный репозиторий**: только вы и приглашенные пользователи

Настройка приватности:
1. Зайдите на [hub.docker.com](https://hub.docker.com)
2. Перейдите в ваш репозиторий
3. Settings → Visibility → Private

### Переменные окружения

⚠️ **Важно:** Не включайте секреты (токены, пароли) в Docker образ!

Используйте переменные окружения при запуске:
```bash
docker run -e SECRET_KEY=your_secret ...
```

Или файл `.env`:
```bash
docker run --env-file .env ...
```

---

## 📊 Проверка публикации

### Проверить на Docker Hub

1. Откройте [hub.docker.com](https://hub.docker.com)
2. Войдите в аккаунт
3. Перейдите в ваш репозиторий: `https://hub.docker.com/r/YOUR_USERNAME/site-etalon`

### Проверить через командную строку

```bash
# Список ваших образов
docker images | grep YOUR_USERNAME

# Информация об образе
docker inspect YOUR_USERNAME/site-etalon:latest
```

---

## 🐛 Troubleshooting

### Ошибка: "denied: requested access to the resource is denied"

**Решение:**
- Убедитесь, что вы авторизованы: `docker login`
- Проверьте правильность имени пользователя в теге
- Убедитесь, что репозиторий существует на Docker Hub

### Ошибка: "unauthorized: authentication required"

**Решение:**
```bash
docker logout
docker login
```

### Ошибка: "repository does not exist"

**Решение:**
- Создайте репозиторий на Docker Hub вручную через веб-интерфейс
- Или используйте правильное имя пользователя и репозитория

### Образ слишком большой

**Решение:**
- Проверьте `.dockerignore` файл
- Используйте multi-stage build (уже настроено)
- Удалите неиспользуемые файлы из образа

---

## ✅ Чек-лист перед публикацией

- [ ] Аккаунт на Docker Hub создан
- [ ] Выполнен `docker login`
- [ ] Образ успешно собирается локально
- [ ] `.dockerignore` настроен правильно
- [ ] Секреты не включены в образ
- [ ] Тег образа соответствует формату `username/image-name:tag`

---

## 🎯 Готово!

Ваш образ опубликован на Docker Hub! 🚀

Теперь вы можете:
- Использовать образ на любом сервере
- Делиться образом с другими
- Автоматизировать развертывание через CI/CD

---

## 📚 Дополнительные ресурсы

- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Docker Build Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

