# copiar e instalar dependencias
FROM node:22-alpine AS builder

WORKDIR /app/webapp

COPY webapp .

RUN npm i

RUN npm run build

# Criar imagens

# Production
FROM node:22-alpine 

WORKDIR /app/server

COPY server .

RUN npm i

COPY --from=builder /app/webapp/dist /app/server/dist

ENTRYPOINT [ "node", "index.js" ]
# run:  docker run --name webapp -e PORT=5001 -e VITE_URL_API=http://localhost:5123  -p 5001:5000  web.app