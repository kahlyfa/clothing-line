FROM node:20-alpine
RUN apk add --no-cache vips-dev build-base python3

ENV CI=true
ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
