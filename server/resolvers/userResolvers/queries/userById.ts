import { UserCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const userById: GQL_QueryResolvers["userById"] = async (_, { id }) => {
  try {
    return await UserCollection.findById(id);
  } catch (e) {
    throw Error(e.message);
  }
};
