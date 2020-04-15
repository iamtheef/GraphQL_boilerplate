import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { WrongCredits, throwNewError } from "../../../../errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import { Users } from "../../../models/index";
const redis = require("redis");
const client = redis.createClient();

export const login: GQL_MutationResolvers["login"] = async (_, { input }) => {
  const { email, password } = input;

  try {
    const foundUser = await Users.findOne({ email }); // check the email exists in the db
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(
        // then compare the password
        password,
        foundUser.password.toString()
      );
      if (passwordMatch) {
        return Access(foundUser); // if password matches return the token
      }
    }
    return WrongCredits.throwError(); // if email/password isn't right return error
  } catch (e) {
    return throwNewError([{ path: "LOGIN", message: `${e.message}` }]);
  }
};
