import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";

export const isUserRegistered: GQL_QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  try {
    return !!(await knex("users").where("email", email)).length;
  } catch (e) {
    throw Error(e.message);
  }
};
