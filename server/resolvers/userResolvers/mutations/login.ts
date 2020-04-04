import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { WrongCredits, generateAuthError } from "../../../errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import { User } from "../../../models/index";

export const login: GQL_MutationResolvers["login"] = async (_, { input }) => {
  const { email, password } = input;

  try {
    console.log(User);
    const foundUser = await User.findOne({ email });
    console.log(foundUser);
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        foundUser.password.toString()
      );
      if (passwordMatch) {
        return Access(foundUser);
      }
    }
    return WrongCredits;
  } catch (e) {
    return generateAuthError("LOGIN", `${e.message}`);
  }
};
