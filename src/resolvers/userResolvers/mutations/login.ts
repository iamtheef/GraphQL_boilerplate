import { Access } from "@utils/auth";
import { WrongCredits, throwNewError } from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import knex from "@config/knex";
import bcrypt from "bcryptjs";

export const login: GQL_MutationResolvers["login"] = async (
  _,
  { input },
  { req }
) => {
  const { email, password } = input;

  try {
    const foundUser = await knex
      .select("*")
      .from("users")
      .where("email", "mail@mail.com")
      .first();

    console.log(foundUser);
    // if (foundUser) {
    //   req.logout();
    //   const passwordMatch = await bcrypt.compare(
    //     password,
    //     foundUser.password.toString()
    //   );
    //   if (passwordMatch) {
    //     return Access(req, foundUser);
    //   }
    // }
    // return WrongCredits.throwError();
    return null;
  } catch (e) {
    return throwNewError([{ path: "LOGIN", message: `${e.message}` }]);
  }
};
