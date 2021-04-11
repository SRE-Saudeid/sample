FROM node:12

RUN env
WORKDIR /app
##
COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]