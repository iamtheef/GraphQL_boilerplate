import knex from "@config/knex";
import { Access } from "@utils/auth";
import bcrypt from "bcryptjs";
import { isAccountValid } from "@utils/isAccountValid";
import { AlreadySigned, throwNewError } from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input },
  { req }
) => {
  const isSigned = !!(await knex("users")
    .where("email", input.email)
    .first());

  if (isSigned) return AlreadySigned.throwError();

  const { isValid, messages } = isAccountValid(input);
  if (!isValid) return throwNewError(messages);

  try {
    const newUser = await knex("users").insert(
      {
        ...input,
        password: bcrypt.hashSync(input.password, 10),
      },
      ["*"]
    );

    return Access(req, newUser); // return the cookie for the newly create user
  } catch (e) {
    return throwNewError([`${e.message}`]); // handling errors
  }
};
