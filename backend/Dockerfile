# Instala dependencias y compila TypeScript a JavaScript
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Ejecución directa del archivo compilado para mayor control en contenedores
EXPOSE 4000
CMD ["node", "dist/index.js"]
