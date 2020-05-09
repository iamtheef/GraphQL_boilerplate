import { mergeResolvers } from "merge-graphql-schemas";
import { userMutations, userQueries } from "./userResolvers/index";
import { articleMutations, articleQueries } from "./articleResolvers/index";
import { migrateUp, migrateDown } from "./db_control";
import knex from "@config/knex";

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
    User: {
      articles: async ({ _, __, ctx }: any) => {
        console.log("CAME HERE");
        console.log(ctx.loaders.articlesLoader());
        ctx.loaders.articlesLoader();
      },
    },
    Article: {
      author: async ({ _, __, ctx }: any) => ctx.loaders.userLoader(),
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
