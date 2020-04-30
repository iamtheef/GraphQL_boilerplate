FROM node:13.13.0-alpine3.11

WORKDIR /graphql-boilerplate-mongo

COPY ./server/package*.json ./

COPY ./server/ ./

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]
