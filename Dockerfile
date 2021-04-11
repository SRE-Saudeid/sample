FROM node:12
ENV teste4 $teste
ARG $teste
ENV teste5 $TESTE1
ARG $TESTE1
RUN env
WORKDIR /app
##
COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]