import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";

// multiple fields search for users
export const findUser: GQL_QueryResolvers["findUser"] = async (
  _,
  { input }
) => {
  try {
    const { email, fullName, googleID, createdAt } = input;
    let whereClause: { [key: string]: any } = {};

    if (email) whereClause["email"] = email;
    if (fullName) whereClause["fullName"] = fullName;
    if (googleID) whereClause["googleID"] = googleID;
    if (createdAt) whereClause["createdAt"] = createdAt;

    return await knex("users").where(whereClause);
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
