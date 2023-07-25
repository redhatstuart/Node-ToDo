FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto 3000
EXPOSE 8080

# Iniciar la aplicación
CMD ["node", "server.js"]
