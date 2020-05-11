import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";
// import { isAuthorQueried } from "@utils/isFieldQueried";

export const userFeed: GQL_QueryResolvers["userFeed"] = async () => {
  try {
    return knex("articles").orderBy("createdAt", "desc");
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
