FROM node:12-alpine

RUN mkdir -p /srv/app/maptracker
WORKDIR /srv/app/maptracker

COPY ./package.json /srv/app/maptracker
COPY ./yarn.lock /srv/app/maptracker

RUN yarn install

CMD [ "yarn", "dev"]
