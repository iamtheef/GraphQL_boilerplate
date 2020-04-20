import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "../src/resolvers/index";
import { typeDefs } from "../types/index";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../config/graphql-shield-rules";

let GQL_Schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

export const schema = applyMiddleware(GQL_Schema, permissions);
