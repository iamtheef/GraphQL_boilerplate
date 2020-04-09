import { mergeResolvers } from "merge-graphql-schemas";
import { userMutations, userQueries } from "./userResolvers/index";
import { articleMutations, articleQueries } from "./articleResolvers/index";
import { ArticleCollection, UserCollection } from "../models/index";
import { GQL_User, GQL_Article } from "schema/schema";
import { DeletedUser, PrivateField } from "../errors/index";

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
      // protecting password from qurying it
      password: () => PrivateField,

      // grabs the id of the parent (User) to retried related articles
      articles: async ({ id }: GQL_User) => {
        return ArticleCollection.find({ authorID: id });
      },
    },
    Article: {
      author: async ({ authorID }: GQL_Article) => {
        return (await UserCollection.findById(authorID)) || DeletedUser;
      },
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
