import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
// import { isArticleQueried } from "@utils/isFieldQueried";
import { unexpectedError } from "@errors/index";

export const allUsers: GQL_QueryResolvers["allUsers"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    return await knex("users");
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
