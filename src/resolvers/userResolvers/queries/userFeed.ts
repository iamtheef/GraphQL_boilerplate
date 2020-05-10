import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";
// import { isAuthorQueried } from "@utils/isFieldQueried";

export const userFeed: GQL_QueryResolvers["userFeed"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    let Query = knex("articles").orderBy("createdAt", "desc");

    return await Query;
    return null;
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
