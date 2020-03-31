import { getModelForClass } from "@typegoose/typegoose";
import { User as DB_User } from "../../models/User";

import { GQL_QueryResolvers, Maybe, GQL_User } from "schema/schema";

const UserModel = getModelForClass(DB_User);
type User = DB_User & GQL_User;

export const users: GQL_QueryResolvers["users"] = async () => {
  try {
    return await UserModel.find();
  } catch (e) {
    throw Error(e.message);
  }
};

export const isUserRegistered: GQL_QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  if (await UserModel.findOne({ email })) return true;
  return false;
};

// multiple fields search for users
// export const userResolver: GQL_QueryResolvers["user"] = async (
//   _,
//   { input }
// ) => {
//   try {
//     const { email, fullName, googleID, createdAt, id } = input;
//     if (id) return await UserModel.findById(id);
//     if (googleID) return await UserModel.find({ googleID: googleID });
//     if (email) return await UserModel.find({ email: email });
//     if (fullName && createdAt) {
//       return UserModel.find({ fullName: fullName, createdAt: createdAt });
//     }
//     if (fullName) return UserModel.find({ fullName: fullName });
//     if (createdAt) return await UserModel.find({ createdAt: createdAt });
//     return [] as <User>;
//   } catch (e) {
//     throw Error(e.message);
//   }
// };
