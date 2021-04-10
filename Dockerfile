FROM node:12
ENV NODE_ENV=${teste}
ARG ${teste}
ENV NODE_ENV=${teste1}
ARG ${teste1}
RUN env
WORKDIR /app
##
COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]