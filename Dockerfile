# Stage 1: Build React Application
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve React Application with Nginx
FROM nginx:stable-alpine

# Копируем собранное React-приложение в Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Копируем конфиг Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Копируем SSL-сертификаты
COPY certs/certificate.crt /etc/nginx/ssl/certificate.crt
COPY certs/certificate.key /etc/nginx/ssl/certificate.key
CMD ["nginx", "-g", "daemon off;"]
