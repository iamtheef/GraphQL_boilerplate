import { GQL_QueryResolvers } from "schema/schema";
import knex from "@config/knex";
import { unexpectedError } from "@errors/index";

export const me: GQL_QueryResolvers["me"] = async (
  _,
  __,
  {
    req: {
      user: { id },
    },
  }
) => {
  try {
    return await knex("users")
      .where("id", id)
      .first();
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
