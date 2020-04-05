import { UserCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const users: GQL_QueryResolvers["users"] = async () => {
  try {
    return await UserCollection.find(); // returns all the users in the db
  } catch (e) {
    throw Error(e.message);
  }
};
