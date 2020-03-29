import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../models/User";
import { queryError } from "../../utils/errors";
import { QueryResolvers, ResolverTypeWrapper } from "schema/schema";

const UserModel = getModelForClass(User);

export const users = async () => {
  try {
    return await UserModel.find();
  } catch(e) {
    console.log(e)
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

// export const user: QueryResolvers["user"] = async (_, { input }) => {
//   // const {email, fullName, googleID, createdAt, id} = input;
//   // const foundUsers: ResolverTypeWrapper<User>[] = [];
//   // // if(id) foundUsers.push(await UserModel.findById(id));
//   // // if (googleID) return await UserModel.findById({googleID: googleID});
//   // // if (email) return await UserModel.findById({email: email});
//   // // // if (fullName) {
//   // //   return await (UserModel.find({fullName: fullName}))
//   // // }
//   // // if (createdAt) {
//   // //   foundUsers.push(UserModel.find({createdAt: createdAt}))
//   // // }
//   return UserModel.find();
// };
