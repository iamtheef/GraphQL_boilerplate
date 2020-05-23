# _GraphQL Server Boilerplate_

A server using Graphql technology on the top of Node/Express stack written in TypeScript ♥️

#### _Please switch to master branch for a mongo version of this server_

## _Features_

- **_Cookie-based_** authentication
- Admin role accounts
- Configurable Environments
- Functionality-based project structure
- Extendable Express REST endpoints
- Apollo GraphQL as middleware for Node Express
- Automatic type code generation for GraphQL resolvers with GraphQL Code Generator
- GraphQL Shield as middleware for GraphQL resolvers
- Facebook Dataloader for caching and batching (conditional population in Mongo version)
- PostgreSQL Database (or MongoDB)
- Adminer for managing DB Database (only in SQL version)
- Redis for Caching
- RedisCommander for managing the Redis Database
- Input Validations
- Rate Limiter (limits request per field per ip per day)
- Pagination
- Error Handling
- Logging

## _Prerequisites_

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/)
- TypeScript
- TSLint
- (Optional) Extensions/Plugins:
  - Apollo GraphQL
  - Docker
  - TSLint

## Getting Started

Assuming you have installed the prerequisites as listed above :

- Open the `docker-compose.yml` file to set the necessary values such as :
  - ENV (enter one of the allowed values `"DEV","TEST","PROD")` defaults to `DEV`
  - SECRET (enter your salt string for hashing the passwords)
  - Set your db credits (`USER` & `PASSWORD`). The defaults are :
  ```
  POSTGRES_USER: admin
  POSTGRES_PASSWORD: password - Set the same values for the environment on line 19.
  ```
 - Build the server

```
docker-compose build

OR

docker-compose up --build
```

this is done only the first time to get the dependencies installed and then you can just run the server.

- Run the server

```
docker-compose up
```

**Note:** You might be prompted to share your drive with Docker if you haven't done so previously. The drive letter you need to share in this case would be the drive letter of where this repository resides.

 <hr>
If docker compose have bootstrapped all services successfully, you should be able to access:

**GraphQL Endpoint**
[http://localhost:4000/graphql](http://localhost:4000/graphql)

**Adminer endpoint**
[http://localhost:8080/](http://localhost:8080/)

Credentials:
|Field|Value|Notes
| -- |--|--|
|System|PostgreSQL|According to the image we use on the `docker-compose.yml` |
|Server| db| Service name in `docker-compose.yml` file for our Database service is named `db`
| Username|admin|As defined in the `docker-compose.yml` config
|Password|password|As defined in the `docker-compose.yml` config
|Databese|admin|same as the `Username`

**Redis Commander endpoint**
[http://localhost:8889](http://localhost:8889/)

**Node Express REST Health Check endpoint**
[http://localhost:4000/status](http://localhost:4000/status)

**Note:** If you prefer a different port, container name, or anything docker environment related. Just modify the `docker-compose.yml` file and adjust to your setup needs.

## Project structure

The folder structure of this project is mainly functionality-based so it should mostly be self explanatory where to put what.
Although it is mostly separated to these very folders :

- `config` a place for all the configuration related files and subfolders.
- `errors` a place for all the errors, error handling functions/classes, messages etc.
- `schema` is a folder which holds the whole structure of the project. Contains `typeDefs` folder for the GraphQL schema and the `schema.ts` file which has all the other types needed generated by `graphql-codegen`. Also contains`index.ts` which merges everything together along with permissions from `graphql-shield`.
- `src` is the core of the project and contains :
  - `dataloaders` handling the N+1 problem arising on graphql api's. On the mongo version this problem is solved by populating the necessary fields after checking what has being queried in the top level resolvers.
  - `db` this folder contains all the db related files including migration functions and seed functions. Available as resolvers in the schema but you can also use the [Migration CLI tool](https://knexjs.org/#Migrations) of knex.
  - `models` this folder holds the models of the project for mongoDB version or just interfaces for the SQL version.
  - `resolvers` holds all the resolvers divided per models and sub-divided per queries/mutations each. You will also find `db_controls.ts`(only in the SQL version) file which contains the custom functions for migrating, seeding, dropping the db when needed. And finally the `index.ts` file which is responsible for merging and exporting everything and for the field level resolvers.
  - `routes` a place for all the external Express routes that may be needed. Currently contains the maintenance route.
  - `utils` this folder holds all the utils used in this project.
- `root directory files`
  - `tsconfig.json` TypeScript configuration file.
  - `Dockerfile`the initial steps to build and run the server.
  - `docker-compose.yml` docker configuration file. - `knexfile.ts` this file configures the connection to the db as well as the routes for migrations and seeding files.
  - `index.ts` this file is the server itself. The function that executes when you run the server and sticks all the pieces together.
  - `package.json`project dependencies and scripts can be found in this file.

## Tests

- First make sure you are not connected to your production database. If you need to run the tests build a new database or use the one that is being built when running docker. **Never run tests on actual databases as they destroy all the data.**
- To run the tests set the `ENV` variable in `docker-compose.yml` file to `TEST` and in `api` service set the command from `npm start` to `npm test` & re-run docker. Don't forget to turn off the restart option (or comment it out before running the tests).

**WARNING** : **_only run tests in fake databases as they drop all the data before running so they will drop all tables if you are connected to a real database._**

## Tips

- To generate new types with `graphql-code-generator` upon schema changes you have to do an `npm run generate` and the new types will be generated in a few seconds if your schema is right. Usually the way I work is I have generator running in a terminal window in watch mode and the server in another window so any changes in the schema are instantly reflected.
- To add new files for the schema all you have to do is to create a new file in the `/schema/typeDefs/` folder. It will be merged automatically but make sure you have generator running as described above to get the new schema.
- To add new resolvers go the the `/src/resolvers/` folder and navigate to the right folder for your resolver (query/mutation). Then make sure to export the resolver as a `const` and don't forget to mention the resolver to the corresponding `index.ts` file.
- Use the `paths` property in `tsconfig.json` file to group related functionalities and for [pretty imports](https://stackoverflow.com/questions/43281741/how-to-use-paths-in-tsconfig-json).
- To update dependencies just add/remove them from the `package.json` and re-build the server or add/remove them while the server is running in `DEV` environment.
- Docker doesn't always run on the first try. If so try `docker-compose down` and then `docker-compose up`
- If you ever run into problems with docker container space capacity you can use any of these commands

  ```
  docker volume rm `docker volume ls -q -f dangling=true`
  OR
  `docker image prune`
  OR
  docker image prune -af
  ```

**\*although use them very carefully as they will erase every docker image, container and cache in your machine**
[more info here](https://docs.docker.com/engine/reference/commandline/image_prune/).

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
