[![Netlify Status](https://api.netlify.com/api/v1/badges/b830d038-f771-4839-b041-86e5e6b5c191/deploy-status)](https://app.netlify.com/sites/maptracker-app/deploys)

# Maptracker App

> Be notified when Steam video game servers you love start playing maps you love.

MapTracker-app is the MapTracker front-end.


## Project setup
To get started, you have 2 options:

##### Docker
Bring up the container by running the following command:
```bash
docker-compose up -d
```
**You will need to provide auth0, onesignal and recaptcha keys for all functionality to work correctly.**

##### Node.js
Install dependencies
```bash
yarn install
```

Run locally
```bash
yarn serve
```

You should find this app running at `localhost:8080`:
![Server Browser](https://cdn.galaco.me/blog/projects/maptracker/server_browser.png)
