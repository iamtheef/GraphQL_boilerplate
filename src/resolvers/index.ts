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
<<<<<<< HEAD
      // articles: async (_: any) => knex("articles").where("authorID", _.id),
      articles: async (_: any, __: any, ctx: any) =>
        await ctx.loaders.articlesLoader.load(_.id),
=======
      articles: async ({ _, __, ctx }: any) => {
        console.log("CAME HERE");
        console.log(ctx.loaders.articlesLoader());
        ctx.loaders.articlesLoader();
      },
>>>>>>> 5c633c9d04fb972dd02bc028a6af51a5d6102036
    },
    Article: {
      author: async ({ _, __, ctx }: any) => ctx.loaders.userLoader(),
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
