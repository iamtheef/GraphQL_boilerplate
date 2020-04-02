import { mergeResolvers } from "merge-graphql-schemas";
import { mutations, queries } from "./userResolvers/index";

const resolversArray = [
  {
    Query: {
      ...queries
    },

    Mutation: {
      ...mutations
    },

    AuthResponse: {
      __resolveType(parent: any, args: any) {
        if (!!parent.token) {
          return "Auth";
        }
        return "ErrorResponse";
      }
    }
  }
];

export const resolvers = mergeResolvers(resolversArray);
