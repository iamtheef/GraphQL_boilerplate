import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";

export const userById: GQL_QueryResolvers["userById"] = async (_, { id }) => {
  try {
    return (await knex("users").where("id", id))[0];
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
