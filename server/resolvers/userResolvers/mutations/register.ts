import { UserCollection } from "../../../models/index";
import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "../../../utils/isPasswordValid";
import {
  AlreadySigned,
  generateAuthError,
  WeakPassword,
} from "../../../errors/index";
import { GQL_MutationResolvers } from "schema/schema";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input }
) => {
  if (await UserCollection.findOne({ email: input.email }))
    // check for duplicate email
    return AlreadySigned; // if so, return
  if (!isPasswordValid(input.password)) return WeakPassword; //check the password is strong enough (requirements in the function)

  try {
    // create new user
    const newUser = await UserCollection.create({
      ...input,
      password: bcrypt.hashSync(input.password, 10), // password encryption
    });

    return Access(newUser); // return the token for the newly create user
  } catch (e) {
    return generateAuthError("REGISTER", `${e.message}`); // handling errors
  }
};
