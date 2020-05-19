import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
// import { isAuthorQueried } from "@utils/isFieldQueried";
import { unexpectedError } from "@errors/index";

export const publicFeed: GQL_QueryResolvers["publicFeed"] = async () => {
  try {
    return knex("articles")
      .orderBy("createdAt", "desc")
      .timeout(1000, { cancel: true });
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
