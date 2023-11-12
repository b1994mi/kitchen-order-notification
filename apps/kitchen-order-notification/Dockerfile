FROM node:20.9.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env-example .env
COPY .env-example ./libs/common/src/.env

CMD npm run typeorm migration:run -- -d ./libs/common/src/torm.datasource.ts && npm run start

# CMD ["npm", "run", "start"]