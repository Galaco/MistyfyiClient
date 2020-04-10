FROM node:12-alpine

RUN mkdir -p /srv/app/ikamu
WORKDIR /srv/app/ikamu

COPY ./package.json /srv/app/ikamu
COPY ./yarn.lock /srv/app/ikamu

RUN yarn install

CMD [ "yarn", "dev"]
