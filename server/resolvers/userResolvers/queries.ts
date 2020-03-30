import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../models/User";
import { queryError } from "../../utils/errors";
import { QueryResolvers, QueryUserArgs } from "schema/schema";

const UserModel = getModelForClass(User);

export const users = async () => {
  try {
    return await UserModel.find();
  } catch (e) {
    console.log(e);
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

export const user = async (_: undefined, { input }: QueryUserArgs) => {
  const { email, fullName, googleID, createdAt, id } = input;
  if (id) return await UserModel.findById(id);
  if (googleID) return await UserModel.find({ googleID: googleID });
  if (email) return await UserModel.find({ email: email });
  if (fullName) return UserModel.find({ fullName: fullName });
  if (createdAt) return await UserModel.find({ createdAt: createdAt });
  return [];
};
