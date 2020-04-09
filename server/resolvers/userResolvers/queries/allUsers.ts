import { UserCollection, ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const allUsers: GQL_QueryResolvers["allUsers"] = async (_, args) => {
  try {
    return await UserCollection.find(); // returns all the users in the db
  } catch (e) {
    throw Error(e.message);
  }
};
