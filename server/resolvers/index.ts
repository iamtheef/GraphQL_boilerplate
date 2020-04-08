import { mergeResolvers } from "merge-graphql-schemas";
import { userMutations, userQueries } from "./userResolvers/index";
import { articleMutations, articleQueries } from "./articleResolvers/index";
import { ArticleCollection } from "../models/index";

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
      articles: (parent: any) => {
        return ArticleCollection.find({ authorID: parent.id });
      },
    },
  },
];

export const resolvers = mergeResolvers(resolversArray);
