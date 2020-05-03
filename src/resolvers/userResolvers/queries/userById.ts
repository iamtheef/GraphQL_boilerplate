import { Users } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const userById: GQL_QueryResolvers["userById"] = async (_, { id }) => {
  try {
    return await Users.findById(id).populate("articles");
  } catch (e) {
    throw Error(e.message);
  }
};
