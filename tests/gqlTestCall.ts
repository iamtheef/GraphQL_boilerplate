import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "../schema/typeDefs";
import { resolvers } from "../src/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlTestCall = async (
  query: any,
  variables?: any,
  id?: number | string
) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      req: {
        login: () => {},
        logout: () => {},
        user: {
          id,
        },
        session: {
          destroy: () => {},
        },
      },
      res: {
        clearCookie: () => {},
      },
    },
    variables
  );
};
