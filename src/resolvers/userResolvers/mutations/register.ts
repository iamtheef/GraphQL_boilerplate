import { Users } from "@models/User";
import { Access } from "@utils/auth";
import { hashSync } from "bcryptjs";
import { isAccountValid } from "@utils/isAccountValid";
import { AlreadySigned, throwNewError } from "@errors/index";
import { GQL_MutationResolvers } from "schema/schema";
import { v4 as uuidv4 } from "uuid";
import knex from "@config/knex";

export const register: GQL_MutationResolvers["register"] = async (
  _,
  { input },
  { req }
) => {
  const isSigned = !!(await Users.where("email", input.email).first());
  if (isSigned) return AlreadySigned.throwError();

  const { isValid, messages } = isAccountValid(input);
  if (!isValid) return throwNewError(messages);

  try {
    const newUser = await Users.insert(
      {
        ...input,
        id: uuidv4(),
        createdAt: knex.fn.now(),
        password: hashSync(input.password, 10),
      },
      ["*"]
    );

    return Access(req, newUser[0]); // return the cookie for the newly create user
  } catch (e) {
    return throwNewError([`${e.message}`]); // handling errors
  }
};
