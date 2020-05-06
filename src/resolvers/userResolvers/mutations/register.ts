import knex from "@config/knex";
import { Access } from "@utils/auth";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "@utils/isPasswordValid";
import { AlreadySigned, throwNewError, WeakPassword } from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input },
  { req }
) => {
  // if (await Users.findOne({ email: input.email })) {
  //   return AlreadySigned.throwError();
  // }
  // if (!isPasswordValid(input.password)) return WeakPassword.throwError();

  try {
    // const newUser = await Users.create({
    //   ...input,
    //   password: bcrypt.hashSync(input.password, 10),
    // });

    // return Access(req, newUser); // return the cookie for the newly create user
    return null;
  } catch (e) {
    return throwNewError([{ path: "REGISTER", message: `${e.message}` }]); // handling errors
  }
};
