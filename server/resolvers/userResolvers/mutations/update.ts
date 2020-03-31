import { MutationResolvers } from "schema/schema";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../../models/User";
import bcrypt from "bcryptjs";

const UserModel = getModelForClass(User);

export const updateAcc: MutationResolvers["updateAcc"] = async (
  _,
  { input }
) => {
  const { id, fullName, password } = input;

  try {
    // checks which have been passed and updates accordingly
    if (fullName) {
      await UserModel.findByIdAndUpdate(id, {
        fullName
      });
    }
    console.log(password);
    // if (password) {
    //   await UserModel.findByIdAndUpdate(id, {
    //     password: bcrypt.hashSync(password, 10)
    //   });
    // }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
