# Etapa 1: build de la app con Node
FROM node:22-slim AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Build de producción
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx-slim

# Copiar build generado por Vite al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar certificados al contenedor
COPY certs/cert.pem /etc/ssl/certs/cert.pem
COPY certs/key.pem /etc/ssl/private/key.pem

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80 dentro del contenedor
EXPOSE 443

# Comando de arranque
CMD ["nginx", "-g", "daemon off;"]
