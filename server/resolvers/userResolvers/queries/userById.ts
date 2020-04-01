import { getModelForClass } from "@typegoose/typegoose";
import { User as DB_User } from "../../../models/User";
import { GQL_QueryResolvers } from "schema/schema";

const UserModel = getModelForClass(DB_User);

export const userById: GQL_QueryResolvers["userById"] = async (_, { id }) => {
  try {
    return await UserModel.findById(id);
  } catch (e) {
    return null;
  }
};
