import { User } from "../../../models/index";
import { Access } from "../../../utils/auth";
import bcrypt from "bcryptjs";
import { AlreadySigned, generateAuthError } from "../../../errors/index";
import { GQL_MutationResolvers } from "schema/schema";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input }
) => {
  if (await User.findOne({ email: input.email })) return AlreadySigned;

  try {
    const newUser = await User.create({
      ...input,
      password: bcrypt.hashSync(input.password, 10)
    });

    return Access(newUser);
  } catch (e) {
    return generateAuthError("REGISTER", `${e.message}`);
  }
};
