FROM node:12.13.0 AS builder
WORKDIR /usr/src/app

RUN npm install -g typescript
COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm install
RUN npm run build

FROM node:12.13.0-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/src/app/build ./build
#RUN npm run migration:run
CMD [ "npm", "start" ]