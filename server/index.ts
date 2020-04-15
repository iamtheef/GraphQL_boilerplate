import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./src/resolvers/index";
import { typeDefs } from "./types/index";

const app = express();

const { DB_STRING } = dotenv.config().parsed;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

(async () => {
  await mongoose
    .connect(DB_STRING, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        name: req,
      };
    },
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => console.log(`🚀 --- 4000/graphql`));
})();
