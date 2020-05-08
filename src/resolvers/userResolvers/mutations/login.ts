import { Access } from "@utils/auth";
import { WrongCredits, throwNewError } from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import knex from "@config/knex";
import { compare } from "bcryptjs";

export const login: GQL_MutationResolvers["login"] = async (
  _,
  { input },
  { req }
) => {
  const { email, password } = input;

  try {
    const foundUser = await knex("users")
      .where("email", email)
      .first();

    if (foundUser) {
      req.logout();

      const passwordMatch = await compare(
        password,
        foundUser.password.toString()
      );

      if (passwordMatch) {
        return Access(req, foundUser);
      }
    }
    return WrongCredits.throwError();
  } catch (e) {
    return throwNewError([`${e.message}`]);
  }
};
