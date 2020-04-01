import { getModelForClass } from "@typegoose/typegoose";
import { User as DB_User } from "../../../models/User";

import { GQL_QueryResolvers, GQL_User } from "schema/schema";

const UserModel = getModelForClass(DB_User);

// multiple fields search for users
export const user: GQL_QueryResolvers["user"] = async (_, { input }) => {
  try {
    let foundUsers: Array<GQL_User & DB_User> | null = null;
    const { email, fullName, googleID, createdAt } = input;
    if (googleID) foundUsers = await UserModel.find({ googleID: googleID });
    if (email) foundUsers = await UserModel.find({ email: email });
    if (fullName && createdAt) {
      foundUsers = await UserModel.find({
        fullName: fullName,
        createdAt: createdAt
      });
    }
    if (fullName) foundUsers = await UserModel.find({ fullName: fullName });
    if (createdAt) foundUsers = await UserModel.find({ createdAt: createdAt });
    return foundUsers;
  } catch (e) {
    throw Error(e.message);
  }
};
