import { Users } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const isUserRegistered: GQL_QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  try {
    if (await Users.findOne({ email })) return true;
    return false;
  } catch (e) {
    throw Error(e.message);
  }
};
