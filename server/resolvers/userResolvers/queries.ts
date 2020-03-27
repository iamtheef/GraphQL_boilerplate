import { getModelForClass } from "@typegoose/typegoose";
import { userQuery } from "../../../common/types/queries/user";
import { User } from "../../models/User";
import { queryError } from "../../utils/errors";
const UserModel = getModelForClass(User);

export const users = async () => {
  try {
    return await UserModel.find();
  } catch {
    return queryError;
  }
};

export const isUserRegistered = async (
  _: any,
  {
    email
  }: {
    email: string;
  }
) => {
  if (await UserModel.findOne({ email })) return true;
  return false;
};

export const user = async (_: any, { googleID, email }: userQuery) => {
  console.log(googleID, email);
  return await UserModel.find();
};
