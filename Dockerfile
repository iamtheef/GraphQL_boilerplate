FROM node:13.13.0-alpine3.11

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]
