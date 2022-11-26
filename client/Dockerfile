FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache git openssh

RUN yarn

COPY next.config.js ./next.config.js
COPY tailwind.config.js ./tailwind.config.js
COPY postcss.config.js ./postcss.config.js

COPY app ./app
COPY pages ./pages
COPY public ./public
COPY styles ./styles

CMD ["yarn","dev"]