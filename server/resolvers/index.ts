import { mergeResolvers } from "merge-graphql-schemas";
import { userMutations, userQueries } from "./userResolvers/index";
import { articleMutations, articleQueries } from "./articleResolvers/index";
import { ArticleCollection, UserCollection } from "../models/index";
import { GQL_User, GQL_Article, GQL_UserQueryInput } from "schema/schema";
import { DeletedAccount } from "../errors/index";
const graphqlFields = require("graphql-fields");

const resolversArray = [
  {
    Query: {
      ...userQueries,
      ...articleQueries
    },

    Mutation: {
      ...userMutations,
      ...articleMutations
    },
    User: {
      // grabs the id of the parent (User) to retrieve related articles
      articles: async ({ id }: GQL_User) => {
        return ArticleCollection.find({ authorID: id });
      }
    }
  }
];

export const resolvers = mergeResolvers(resolversArray);
