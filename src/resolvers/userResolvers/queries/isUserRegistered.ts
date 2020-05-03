import { Users } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const isUserRegistered: GQL_QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  try {
    return !!(await Users.findOne({ email }));
  } catch (e) {
    throw Error(e.message);
  }
};
