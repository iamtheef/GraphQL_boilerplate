import { mergeResolvers } from "merge-graphql-schemas";
import { userMutations, userQueries } from "./userResolvers/index";
import { articleMutations, articleQueries } from "./articleResolvers/index";

const resolversArray = [
  {
    Query: {
      ...userQueries,
      ...articleQueries
    },

    Mutation: {
      ...userMutations,
      ...articleMutations
    }
  }
];

export const resolvers = mergeResolvers(resolversArray);
