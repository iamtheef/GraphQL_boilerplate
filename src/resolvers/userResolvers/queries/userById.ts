import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";

export const userById: GQL_QueryResolvers["userById"] = async (_, { id }) => {
  try {
    // return await Users.findById(id).populate("articles");
    return null;
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
