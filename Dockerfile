FROM node:12

ARG ${teste}
ENV teste4 ${teste}
ARG $TESTE1
ENV teste5 $TESTE1
RUN env
WORKDIR /app
##
COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]