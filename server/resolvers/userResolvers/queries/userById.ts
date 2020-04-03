import { User } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const userById: GQL_QueryResolvers["userById"] = async (_, { id }) => {
  try {
    return await User.findById(id);
  } catch (e) {
    return null;
  }
};
