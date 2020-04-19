import { GQL_MutationResolvers } from "schema/schema";
import { Users } from "@models/index";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "@utils/isPasswordValid";
import {
  InvalidPassword,
  MismatchedPasswords,
  throwNewError,
  WeakPassword,
  UnauthorizedAction,
} from "@errors/index";

export const updateAcc: GQL_MutationResolvers["updateAcc"] = async (
  _,
  { input },
  { req }
) => {
  const { fullName, password } = input;
  const { oldPassword, newPassword, confirmPassword } = password;

  try {
    // checks which have been passed and updates accordingly (if the .oldPassword is right)
    if (!req.isAuthenticated()) throw new Error("Not logged in!");

    const foundUser = await Users.findById(req.user._id);

    if (req.user.id !== foundUser.id) return UnauthorizedAction.throwError();

    if (!(await bcrypt.compare(oldPassword, foundUser.password.toString()))) {
      return InvalidPassword.throwError(); // return error if the in use password is wrong
    }

    if (fullName) {
      foundUser.fullName = fullName;
    }

    if (newPassword) {
      if (!isPasswordValid(newPassword)) return { ...WeakPassword }; // checks for weak password

      if (newPassword !== confirmPassword) {
        return MismatchedPasswords.throwError();
      }
      // if all ok, updates the user
      foundUser.password = bcrypt.hashSync(password.newPassword, 10);
    }

    await foundUser.save();

    return { success: true, errors: [] }; // Account Updated
  } catch (e) {
    return throwNewError([{ path: "UPDATE ACCOUNT", message: `${e.message}` }]); // server error handling
  }
};
