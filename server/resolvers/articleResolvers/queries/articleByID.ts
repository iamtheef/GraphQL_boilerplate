import { ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const articleByID: GQL_QueryResolvers["articleByID"] = async (
  _,
  { id }
) => {
  try {
    return await ArticleCollection.findById(id); // returns all the users in the db
  } catch (e) {
    throw Error(e.message);
  }
};
