# ✅ Task Manager App

**Task Manager** — это современное веб-приложение для планирования задач и контроля работы подчинённых.  
Проект позволяет **создавать, редактировать, удалять и отслеживать задачи**, **назначать исполнителей**, **фильтровать по срокам** и **группировать задачи по сотрудникам**. Также реализована **система авторизации** и **ролевое разграничение доступа**.

Этот репозиторий включает в себя **frontend часть для полной работы нужна и backend часть https://github.com/Danil20340/todo-list-backend** так как они работают совместно в Docker-контейнерах.

---

## ⚙️ Функциональность

- 🧾 Создание и редактирование задач
- 🧑‍💼 Назначение исполнителей и контроль статусов
- 📅 Группировка по ответственным
- ⏰ Фильтрация по сроку исполнения
- 🔐 Авторизация и проверка прав
- 🧭 Панель руководителя с задачами подчинённых
- 🌐 REST API с авторизацией по токену

---

## 🧰 Стек технологий

### 🖥 Frontend
- ⚛️ React + TypeScript
- 🧭 React Router
- 📦 Redux Toolkit + RTK Query
- 🎨 HeroUI
- ⚡ Vite

### 🛠 Backend
- 🚀 Express
- 🛢 PostgreSQL
- 🔗 Knex
- 🔒 JWT авторизация
- 📦 REST API
- 🐳 Docker + Docker Compose

---

## 📸 Скриншоты

Страница авторизации 
![image](https://github.com/user-attachments/assets/95cb51a8-ffee-41dc-975b-69332fe3855d)

Страница задач руководителя  
![image](https://github.com/user-attachments/assets/77fda418-f4e9-4a00-8750-945cd58dfcf5)

Форма создания задачи  
![image](https://github.com/user-attachments/assets/459a208a-8ebe-4e82-a91a-644bdd8f507c)

Форма редактирования задачи  
![image](https://github.com/user-attachments/assets/624583c6-31f5-439d-b2ec-261e81131795)

Страница задач исполнителя  
![image](https://github.com/user-attachments/assets/e8822a24-4abe-47a7-acd0-fc148ce4ac2f)

---

## 🚀 Запуск проекта через Docker

### 📁 1. Структура директорий

Клонируй `todo-list-frontend` и `todo-list-backend` в одну папку:
/task-manager-project ├── todo-list-frontend └── todo-list-backend

---

### 📄 2. Создай `.env` в `todo-list-backend`

.env
PORT=3000
SECRET_KEY=supersecretkey123
DB_HOST=db
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=todo-list-db

---

 ###  🛠️ 3. Сборка и запуск контейнеров
 
Перейди в todo-list-backend и выполни:docker compose up --build -d

---

###⚙️ Это запустит:

PostgreSQL

Express API сервер

Nginx + frontend

### 🌐 4. Откройте приложение
После запуска приложение будет доступно по адресу:
http://localhost

---

### 👤 5. Вход как администратор
Используйте следующие данные:

Логин: admin  
Пароль: password123

Эти данные можно изменить в seed-скриптах.

## 🌐 Демо
[https://danil20340.github.io/The-minesweeper/#/](https://develop-projects.ru/auth)

Войти как админ:
Логин: admin
Пароль: password123

Войти как исполнитель:
Логин: oleg
Пароль: password123
