import { RegistrationInput } from "../../../common/types/api/auth/register";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../models/User";
import { Access } from "../../utils/auth";
import bcrypt from "bcryptjs";
import { AlreadySigned, error } from "../../utils/errors";
import { MutationResolvers } from "generated/schema";

const UserModel = getModelForClass(User);

export const register: MutationResolvers["register"] = async (_, { input }) => {
  if (await UserModel.findOne({ email: input.email })) return AlreadySigned;

  try {
    const newUser = await UserModel.create({
      ...input,
      password: bcrypt.hashSync(input.password, 10)
    });

    return Access(newUser);
  } catch (e) {
    console.log(e);
    return error;
  }
};
