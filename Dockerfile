# Imagen base de Node.js
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Variables de entorno por defecto (se sobreescriben con docker-compose)
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
