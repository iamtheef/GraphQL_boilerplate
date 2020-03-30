import { MutationResolvers } from "schema/schema";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../../models/User";

const UserModel = getModelForClass(User);

export const deleteAcc: MutationResolvers["deleteAcc"] = async (_, { id }) => {
  try {
    if (await UserModel.findByIdAndDelete({ _id: id.trim() })) return true;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
