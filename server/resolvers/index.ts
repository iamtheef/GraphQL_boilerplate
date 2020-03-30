import { mergeResolvers } from "merge-graphql-schemas";
import { mutations, queries } from "./userResolvers/index";

const resolversArray = [
  {
    Query: {
      ...queries
    },

    Mutation: {
      ...mutations
    }
  }
];

export const resolvers = mergeResolvers(resolversArray);
