FROM node:18.14-alpine

ENV PORT=3001

WORKDIR /server

COPY . .

RUN npm install
RUN npm run build

CMD ["node", "./dist/main.js"]