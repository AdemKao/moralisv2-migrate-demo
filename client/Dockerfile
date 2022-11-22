FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn upgrade
RUN yarn

COPY next.config.js ./next.config.js

COPY src ./src
COPY pages ./pages
COPY public ./public
COPY styles ./styles

CMD ["yarn","dev"]