import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";

export const userById: GQL_QueryResolvers["userById"] = async (_, { id }) => {
  try {
    // return await Users.findById(id).populate("articles");
    return null;
  } catch (e) {
    throw Error(e.message);
  }
};
