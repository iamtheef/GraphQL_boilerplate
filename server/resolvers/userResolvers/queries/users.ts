import { getModelForClass } from "@typegoose/typegoose";
import { User as DB_User } from "../../../models/User";

import { GQL_QueryResolvers } from "schema/schema";

const UserModel = getModelForClass(DB_User);

export const users: GQL_QueryResolvers["users"] = async () => {
  try {
    return await UserModel.find();
  } catch (e) {
    throw Error(e.message);
  }
};
