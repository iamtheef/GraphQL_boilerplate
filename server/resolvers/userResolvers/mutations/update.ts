import { MutationResolvers } from "schema/schema";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../../models/User";
import bcrypt from "bcryptjs";
import { generateUpdateError } from "../../../utils/errors";

const UserModel = getModelForClass(User);

export const updateAcc: MutationResolvers["updateAcc"] = async (
  _,
  { input }
) => {
  const { id, fullName, password } = input;

  try {
    // checks which have been passed and updates accordingly (if the .oldPassword is right)
    const user = await UserModel.findById(id);

    if (!(await bcrypt.compare(password.oldPassword, user.password.toString())))
      return generateUpdateError("PASSWORD", "Invalid password, try again.");

    if (fullName) {
      await UserModel.findByIdAndUpdate(id, {
        fullName
      });
    }

    if (password.newPassword) {
      if (password.newPassword === password.confirmPassword) {
        await UserModel.findByIdAndUpdate(id, {
          password: bcrypt.hashSync(password.newPassword, 10)
        });
      } else
        return generateUpdateError("PASSWORDS", "Passwords have to match!");
    }
    return { success: true, errors: [] }; // Account Updated
  } catch (e) {
    throw Error(e.message);
  }
};
