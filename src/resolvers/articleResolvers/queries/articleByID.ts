import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";

export const articleByID: GQL_QueryResolvers["articleByID"] = async (
  _,
  { id }
) => {
  try {
    return await knex("articles")
      .where("id", id)
      .first();
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
