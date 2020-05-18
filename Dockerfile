FROM node:13.13.0-alpine3.11

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 4000

# always run either of them but not concurerntly
# uncomment this command & comment out the test command to run the server
# CMD ["npm" ,"start"]

# uncomment this command & comment out the start command to test the server
CMD ["npm" ,"test"]

