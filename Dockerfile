# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG ENVIRONMENT=production
RUN npm run build:${ENVIRONMENT}

# Etapa 2: Servir la aplicación usando un servidor estático
FROM nginx:alpine

# Copia los archivos compilados desde la etapa de construcción
COPY --from=build /app/dist/client/browser /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]