import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { WrongCredits, generateAuthError } from "../../../errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import { UserCollection } from "../../../models/index";

export const login: GQL_MutationResolvers["login"] = async (_, { input }) => {
  const { email, password } = input;

  try {
    const foundUser = await UserCollection.findOne({ email }); // check the email exists in the db
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(
        // then compare the password
        password,
        foundUser.password.toString()
      );
      if (passwordMatch) {
        return Access(foundUser); // if password matches return the token
      }
    }
    return WrongCredits; // if email/password isn't right return error
  } catch (e) {
    return generateAuthError("LOGIN", `${e.message}`); // handling anything elese
  }
};
