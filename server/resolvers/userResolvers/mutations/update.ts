import { GQL_MutationResolvers } from "schema/schema";
import { UserCollection } from "../../../models/index";
import bcrypt from "bcryptjs";

// importing the errors used
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
    // prevents updating user profile from forgotten login account
    const user = await UserCollection.findById(id);

    if (!(await bcrypt.compare(password.oldPassword, user.password.toString())))
      return InvalidPassword; // return error if the in use password is wrong

    // checks if a new fullname has been passed in
    if (fullName) {
      await UserCollection.findByIdAndUpdate(id, {
        fullName,
      });
    }
    // checks if a new password has been passed in
    if (password.newPassword) {
      //checks if the password matches the confirm (reventing mistyping the password)
      if (password.newPassword === password.confirmPassword) {
        // if all ok, updates the user
        await UserCollection.findByIdAndUpdate(id, {
          password: bcrypt.hashSync(password.newPassword, 10),
        });
      } else return MismatchedPasswords; // return mismatched password error
    }
    return SuccessUpdated; // Account Updated
  } catch (e) {
    throw Error(e.message); // server error handling
  }
};
