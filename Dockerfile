FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/maptracker
WORKDIR /srv/app/maptracker

COPY ./package.json /srv/app/maptracker
COPY ./package-lock.json /srv/app/maptracker

RUN npm install

CMD [ "npm", "run-script", "serve" ]
