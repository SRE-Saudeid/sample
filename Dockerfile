FROM node:12
ENV NODE_ENV=${TESTE}
ARG ${TESTE}
ENV NODE_ENV=${TESTE1}
ARG ${TESTE1}
RUN env
WORKDIR /app
##
COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]