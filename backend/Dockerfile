FROM node:20-alpine AS builder

WORKDIR /backend-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /backend-api

COPY --from=builder /backend-api/dist ./dist
COPY --from=builder /backend-api/node_modules ./node_modules

EXPOSE 3333

CMD ["node", "dist/main"]