import { User } from "../../../models/index";
import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "../../../utils/isPasswordValid";
import {
  AlreadySigned,
  generateAuthError,
  WeakPassword,
} from "../../../errors/index";
import { GQL_MutationResolvers } from "schema/schema";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input }
) => {
  if (await User.findOne({ email: input.email })) return AlreadySigned;
  if (!isPasswordValid(input.password)) return WeakPassword;

  try {
    const newUser = await User.create({
      ...input,
      password: bcrypt.hashSync(input.password, 10),
    });

    return Access(newUser);
  } catch (e) {
    return generateAuthError("REGISTER", `${e.message}`);
  }
};
