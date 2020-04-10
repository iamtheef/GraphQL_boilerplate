import { mergeResolvers } from "merge-graphql-schemas";
import { userMutations, userQueries } from "./userResolvers/index";
import { articleMutations, articleQueries } from "./articleResolvers/index";
import { ArticleCollection, UserCollection } from "../models/index";
import { GQL_User, GQL_Article } from "schema/schema";
import { DeletedAccount } from "../errors/index";

const resolversArray = [
  {
    Query: {
      ...userQueries,
      ...articleQueries,
    },

    Mutation: {
      ...userMutations,
      ...articleMutations,
    },
    User: {
      // grabs the id of the parent (User) to retrieve related articles
      articles: async ({ id }: GQL_User) => {
        return ArticleCollection.find({ authorID: id });
      },
    },
    Article: {
      // grabs the authorID of the parent (Article) to retrieve all the author's fields
      author: async ({ authorID }: GQL_Article) => {
        return (await UserCollection.findById(authorID)) || DeletedAccount;
      },
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
