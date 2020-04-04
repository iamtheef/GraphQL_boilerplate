import { GQL_MutationResolvers } from "schema/schema";
import { User } from "../../../models/index";
import bcrypt from "bcryptjs";
import {
  InvalidPassword,
  MismatchedPasswords,
  SuccessUpdated,
} from "../../../errors/index";

export const updateAcc: GQL_MutationResolvers["updateAcc"] = async (
  _,
  { input }
) => {
  const { id, fullName, password } = input;

  try {
    // checks which have been passed and updates accordingly (if the .oldPassword is right)
    const user = await User.findById(id);

    if (!(await bcrypt.compare(password.oldPassword, user.password.toString())))
      return InvalidPassword;

    if (fullName) {
      await User.findByIdAndUpdate(id, {
        fullName,
      });
    }

    if (password.newPassword) {
      if (password.newPassword === password.confirmPassword) {
        await User.findByIdAndUpdate(id, {
          password: bcrypt.hashSync(password.newPassword, 10),
        });
      } else return MismatchedPasswords;
    }
    return SuccessUpdated; // Account Updated
  } catch (e) {
    throw Error(e.message);
  }
};
