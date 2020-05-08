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
      articles: async (_: any) => {
        const articles = await knex("articles").where("authorID", _.id);
        return articles;
      },
    },
    Article: {
      author: async (_: any) => {
        const author = knex("users").where("id", _.authorID);
        return author.first();
      },
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
