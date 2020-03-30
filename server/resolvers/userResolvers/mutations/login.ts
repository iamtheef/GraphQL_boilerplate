import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../../models/User";
import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { WrongCredits, error } from "../../../utils/errors";
import { MutationResolvers } from "schema/schema";

const UserModel = getModelForClass(User);

export const login: MutationResolvers["login"] = async (_, { input }) => {
  const { email, password } = input;
  try {
    const foundUser = await UserModel.findOne({ email });
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
    console.log(e);
    return error;
  }
};
