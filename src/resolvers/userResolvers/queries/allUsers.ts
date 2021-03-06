import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
// import { isArticleQueried } from "@utils/isFieldQueried";
import { unexpectedError } from "@errors/index";

export const allUsers: GQL_QueryResolvers["allUsers"] = async () => {
  try {
    return await knex("users").timeout(1000, { cancel: true });
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
