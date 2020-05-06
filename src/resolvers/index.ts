import { mergeResolvers } from "merge-graphql-schemas";
import { userMutations, userQueries } from "./userResolvers/index";
import { articleMutations, articleQueries } from "./articleResolvers/index";

import { migrateUp, migrateDown } from "./db_control";

const resolversArray = [
  {
    Query: {
      ...userQueries,
      ...articleQueries,
    },

    Mutation: {
      migrateUp,
      migrateDown,
      ...userMutations,
      ...articleMutations,
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
