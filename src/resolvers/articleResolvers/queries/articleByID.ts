import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";

export const articleByID: GQL_QueryResolvers["articleByID"] = async (
  _,
  { id }
) => {
  try {
    // return await Articles.findById(id).populate("author");
    return null;
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
