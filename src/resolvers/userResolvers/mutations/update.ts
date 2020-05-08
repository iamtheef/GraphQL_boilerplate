import { GQL_MutationResolvers } from "schema/schema";
import knex from "@config/knex";
import { compare, hashSync } from "bcryptjs";
import { isPasswordValid } from "@utils/isPasswordValid";
import {
  InvalidPassword,
  MismatchedPasswords,
  throwNewError,
  WeakPassword,
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
    const foundUser = await knex("users")
      .where("id", req.user.id)
      .first();

    if (!(await compare(oldPassword, foundUser.password.toString()))) {
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
      foundUser.password = hashSync(password.newPassword, 10);
    }

    // if all ok, updates the user
    await knex("users")
      .where("id", req.user.id)
      .update({
        ...foundUser,
        updatedAt: knex.fn.now(),
      });
    return { success: true, errors: [] }; // Account Updated
  } catch (e) {
    return throwNewError([`${e.message}`]); // server error handling
  }
};
