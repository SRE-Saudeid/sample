FROM node:12

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]