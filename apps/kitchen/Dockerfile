FROM node:20.9.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env-example .env

CMD ["npm", "run", "start", "kitchen"]