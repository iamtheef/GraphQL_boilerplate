import { RegistrationInput } from "../../../common/types/api/auth/register";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../models/User";
import { Access } from "../../utils/auth";
import bcrypt from "bcryptjs";
import { AlreadySigned, error } from "../../utils/errors";

const UserModel = getModelForClass(User);

export const register = async (_: any, { input }: RegistrationInput) => {
  if (await UserModel.findOne({ email: input.email })) return AlreadySigned;

  try {
    const newUser = await UserModel.create({
      ...input,
      password: bcrypt.hashSync(input.password, 10)
    });

    return Access(newUser);
  } catch {
    return error;
  }
};
