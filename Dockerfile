FROM node:12

ARG TESTE
ARG TESTE1
ENV teste4 ${TESTE}
ENV teste5 ${TESTE1}
RUN env
WORKDIR /app
##
COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]