import { Access } from "@utils/auth";
import { WrongCredits, throwNewError } from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import { Users } from "@models/index";
import bcrypt from "bcryptjs";

export const login: GQL_MutationResolvers["login"] = async (
  _,
  { input },
  ___
) => {
  const { email, password } = input;

  try {
    const foundUser = await Users.findOne({ email }); // check the email exists in the db
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        foundUser.password.toString()
      );
      if (passwordMatch) {
        ___.req.login(foundUser, (err: any) => {
          if (err) console.log(err);
        });

        return { success: true }; // if password matches return the token
      }
    }
    return WrongCredits.throwError(); // if email/password isn't right return error
  } catch (e) {
    return throwNewError([{ path: "LOGIN", message: `${e.message}` }]);
  }
};
