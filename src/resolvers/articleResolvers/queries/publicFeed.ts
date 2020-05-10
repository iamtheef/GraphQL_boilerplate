import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
// import { isAuthorQueried } from "@utils/isFieldQueried";
import { unexpectedError } from "@errors/index";

export const publicFeed: GQL_QueryResolvers["publicFeed"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    let Query = knex("articles").orderBy("createdAt", "desc");

    return await Query;
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
