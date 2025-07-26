FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
# This Dockerfile sets up a Node.js application using an Alpine Linux base image.
# It installs dependencies from package.json, copies the application code,
# exposes port 8080, and runs the application in production mode using the `serve` command.
# The application is built using Vite, a modern frontend build tool.
# For more details on Dockerizing a React application built with Vite, refer to:
# https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa