import { UserCollection, ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const articles: GQL_QueryResolvers["allUsers"] = async (_, args) => {
  try {
    return await ArticleCollection.find(); // returns all the users in the db
  } catch (e) {
    throw Error(e.message);
  }
};
