import { User } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const users: GQL_QueryResolvers["users"] = async () => {
  try {
    return await User.find();
  } catch (e) {
    throw Error(e.message);
  }
};
