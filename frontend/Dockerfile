FROM node:20-alpine AS builder

WORKDIR /frontend-app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /frontend-app

ENV NODE_ENV production

COPY --from=builder /frontend-app/public ./public
COPY --from=builder /frontend-app/.next ./.next
COPY --from=builder /frontend-app/node_modules ./node_modules
COPY --from=builder /frontend-app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]

