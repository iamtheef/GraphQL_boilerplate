import { Users } from "@models/index";
import { Access } from "@utils/auth";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "@utils/isPasswordValid";
import {
  AlreadySigned,
  throwNewError,
  WeakPassword,
  Authenticated,
} from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input },
  { req }
) => {
  //error handling
  if (req.user) return Authenticated.throwError();

  if (await Users.findOne({ email: input.email })) {
    return AlreadySigned.throwError();
  }
  if (!isPasswordValid(input.password)) return WeakPassword.throwError();

  try {
    const newUser = await Users.create({
      ...input,
      password: bcrypt.hashSync(input.password, 10),
    });

    return Access(req, newUser); // return the cookie for the newly create user
  } catch (e) {
    return throwNewError([{ path: "REGISTER", message: `${e.message}` }]); // handling errors
  }
};
