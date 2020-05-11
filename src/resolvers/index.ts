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
    User: {
      // articles: async (_: any) => knex("articles").where("authorID", _.id),
      articles: async (_: any, __: any, ctx: any) =>
        ctx.loaders.articlesLoader.load(_.id),
    },
    Article: {
      author: async (_: any, __: any, ctx: any) =>
        ctx.loaders.userLoader.load(_.authorID),
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
