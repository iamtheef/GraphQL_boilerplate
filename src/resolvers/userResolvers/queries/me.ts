import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";

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
    throw Error(e.message);
  }
};
