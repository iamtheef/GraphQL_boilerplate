import { mergeResolvers } from "merge-graphql-schemas";
import { login, register, queries } from "./userResolvers/index";

const resolversArray = [
  {
    Query: {
      ...queries
    },

    Mutation: {
      register,
      login
    }
  }
];

export const resolvers = mergeResolvers(resolversArray);
