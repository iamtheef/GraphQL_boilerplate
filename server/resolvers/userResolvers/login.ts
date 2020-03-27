import { LoginInput } from "../../../common/types/api/auth/login";
// import { ErrorResponse } from "../../../common/types/misc/errors";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../models/User";
import { Access } from "../../utils/auth";
import bcrypt from "bcryptjs";
import { WrongCredits, error } from "../../utils/errors";

const UserModel = getModelForClass(User);

export const login = async (_: any, { input }: LoginInput) => {
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
  } catch {
    return error;
  }
};
