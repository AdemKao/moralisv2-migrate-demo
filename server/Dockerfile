FROM node:18-alpine 

RUN mkdir parse

ADD . /parse

WORKDIR /parse


# RUN apk add --no-cache git openssh

# RUN yarn add tsc
# RUN yarn build
RUN yarn

ENV APP_ID adapt-dev-application-id
ENV MASTER_KEY 2wsx3dcwdsfgwedewf
ENV SERVER_URL http://localhost:1337/server
ENV DATABASE_URI mongodb://172.17.0.2:27017/parse
ENV NODE_ENV development


EXPOSE 1337

CMD [ "yarn", "dev" ]
