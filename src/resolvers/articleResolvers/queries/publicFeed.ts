import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
// import { isAuthorQueried } from "@utils/isFieldQueried";
import { unexpectedError } from "@errors/index";

export const publicFeed: GQL_QueryResolvers["publicFeed"] = async () => {
  try {
    return knex("articles").orderBy("createdAt", "desc");
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
