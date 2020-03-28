import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../models/User";
import { queryError } from "../../utils/errors";
import { QueryResolvers } from "generated/schema";
const UserModel = getModelForClass(User);

export const users = async () => {
  try {
    return await UserModel.find();
  } catch {
    return queryError;
  }
};

export const isUserRegistered: QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  if (await UserModel.findOne({ email })) return true;
  return false;
};

export const user: QueryResolvers["user"] = async (_, { input }) => {
  const { googleID, email } = input;
  console.log(googleID, email);
  return await UserModel.find();
};
