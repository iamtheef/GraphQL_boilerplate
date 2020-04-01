import { getModelForClass } from "@typegoose/typegoose";
import { User as DB_User } from "../../../models/User";

import { GQL_QueryResolvers } from "schema/schema";

const UserModel = getModelForClass(DB_User);

export const isUserRegistered: GQL_QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  if (await UserModel.findOne({ email })) return true;
  return false;
};
