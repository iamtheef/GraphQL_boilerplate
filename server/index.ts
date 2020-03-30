import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers/index";
import { typeDefs } from "./types/index";
// import { generateSchema } from "./generated/graph-generator";

const db = dotenv.config().parsed.DB_STRING;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

(async () => {
  await mongoose
    .connect(db, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => console.log("Connected to DB"))
    .catch(e => console.log(e));
  // await generateSchema();
  await new ApolloServer({
    schema
  })
    .listen()
    .then(({ url }) => {
      console.log(`🚀 --- ${url}`);
    });
})();
