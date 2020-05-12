import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
import { unexpectedError } from "@errors/index";
import validator from "validator";
const { isEmpty } = validator;

export const isUserRegistered: GQL_QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  try {
    return !!(await knex("users").where("email", email))[0];
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
