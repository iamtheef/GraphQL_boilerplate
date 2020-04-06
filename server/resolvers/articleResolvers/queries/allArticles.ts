import { ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const allArticles: GQL_QueryResolvers["allArticles"] = async () => {
  try {
    return await ArticleCollection.find(); // returns all the users in the db
  } catch (e) {
    throw Error(e.message);
  }
};
