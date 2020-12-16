FROM node:8.10.0

RUN npm install -g mocha
RUN npm install -g nodemon
RUN npm install -g serverless


RUN mkdir /var/app
ADD . /var/app
WORKDIR /var/app


RUN npm install

ENTRYPOINT nodemon -L index.js
