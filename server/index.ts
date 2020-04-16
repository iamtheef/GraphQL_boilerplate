import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./src/resolvers/index";
import { typeDefs } from "./types/index";
import { corsOpts } from "./config/server-config";
import cors from "cors";
import helmet from "helmet";

const app = express();

const { DB_STRING, PORT } = dotenv.config().parsed;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

(async () => {
  app.use(cors(corsOpts));
  app.use(helmet());

  await mongoose
    .connect(DB_STRING, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));

  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`🚀 --- ${PORT}/graphql`));
})();
