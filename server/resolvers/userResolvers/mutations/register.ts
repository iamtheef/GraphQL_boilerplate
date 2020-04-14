import { Users } from "../../../models/index";
import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "../../../utils/isPasswordValid";
import {
  AlreadySigned,
  throwNewError,
  WeakPassword
} from "../../../errors/index";
import { GQL_MutationResolvers } from "schema/schema";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input }
) => {
  // checks for duplicate email
  if (await Users.findOne({ email: input.email }))
    // if so, returns
    return AlreadySigned.throwError();
  if (!isPasswordValid(input.password)) return WeakPassword.throwError(); //checks if the password is strong enough (requirements in the function)

  try {
    // create new user
    const newUser = await Users.create({
      ...input,
      password: bcrypt.hashSync(input.password, 10) // password encryption
    });

    return Access(newUser); // return the token for the newly create user
  } catch (e) {
    return throwNewError([{ path: "REGISTER", message: `${e.message}` }]); // handling errors
  }
};
