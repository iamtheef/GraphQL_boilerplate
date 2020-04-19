import { Access } from "@utils/auth";
import { WrongCredits, throwNewError, Authenticated } from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import { Users } from "@models/index";
import bcrypt from "bcryptjs";

export const login: GQL_MutationResolvers["login"] = async (
  _,
  { input },
  { req }
) => {
  if (req.user) return Authenticated.throwError();
  const { email, password } = input;

  try {
    const foundUser = await Users.findOne({ email });
    if (foundUser) {
      req.logout();
      const passwordMatch = await bcrypt.compare(
        password,
        foundUser.password.toString()
      );
      if (passwordMatch) {
        return Access(req, foundUser);
      }
    }
    return WrongCredits.throwError();
  } catch (e) {
    return throwNewError([{ path: "LOGIN", message: `${e.message}` }]);
  }
};
