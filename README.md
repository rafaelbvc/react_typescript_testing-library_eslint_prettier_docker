# Base Project:

Librarie:

- ReactJS

Template:

- TypeScript

Testing:

- Native Testing Library

Beautify:

- Prettier

Error Checking:

- Native esLint

Container:

- Docker

Open a GitBash CLI and execute:

git clone PLUSTHECOPYOFGITPATHFROMSSH

Execute:

code .

or

Open the main folder with the cloned project and execute in a terminal:

at the folder app/ execute:

npm install

If use yarn or other package manager install packages at packege.json

Install Docker Desktop / Docker Compose (executable or via CLI)

or

Download the ZIP folder and follow the instructions above

or

Copy without an SSH and follow the instructions above

##############################################

Execute the follow instructions:

CLI commands:

npx create-react-app app --template typescript

Create a folder on the root of aplication app/:
.nginx

output app/.nginx

Create a file inside .nginx folder:
nginx.conf

output app/.nginx/nginx.conf

Insert the code below (PS: from https://github.com/docker/awesome-compose/blob/master/react-nginx/README.md):

##############################################

server {

listen 80;

location / {
root /usr/share/nginx/html;
index index.html index.htm;
try_files $uri /index.html =404;
}

error_page 500 502 503 504 /50x.html;

location = /50x.html {
root /usr/share/nginx/html;
}
}

##############################################

Create a file on the root of aplication app/:
.dockerignore

output app/.dockerignore

Insert the code below (PS: from https://github.com/docker/awesome-compose/blob/master/react-nginx/README.md):

##############################################

node_modules
npm-debug.log
build
.dockerignore
**/.git
**/.DS_Store
\*\*/node_modules

##############################################

Create a file on the root of aplication app/:
Dockerfile

output app/Dockerfile

Insert the code below (PS: from https://github.com/docker/awesome-compose/blob/master/react-nginx/README.md):

##############################################

# syntax=docker/dockerfile:1.4

# 1. For build React app

FROM node:lts AS development

# Set working directory

WORKDIR /app

#

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Same as npm install

RUN npm ci

COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]

FROM development AS build

RUN npm run build

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

# install Docker tools (cli, buildx, compose)

COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

# 2. For Nginx setup

FROM nginx:alpine

# Copy config nginx

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets

RUN rm -rf ./\*

# Copy static assets from builder stage

COPY --from=build /app/build .

# Containers run nginx with global directives and daemon off

ENTRYPOINT ["nginx", "-g", "daemon off;"]

##############################################

Create a file on the root of aplication app/:
compose.yaml

output app/compose.yaml

Insert the code below (PS: from https://github.com/docker/awesome-compose/blob/master/react-nginx/README.md):

##############################################

services:
frontend:
build:
context: .
container_name: frontend
ports: - "80:80"

##############################################

And execute the command below:

docker compose up -d

# Best regards

# Rafael Vendramini

# Enjoy!
