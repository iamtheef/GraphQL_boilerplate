import { ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";
const graphqlFields = require("graphql-fields");

export const allArticles: GQL_QueryResolvers["allArticles"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    if (graphqlFields(info).author) {
      return await ArticleCollection.find().populate("author"); // returns all the articles with the author
    }

    return await ArticleCollection.find(); // returns all the articles without the author
  } catch (e) {
    throw Error(e.message);
  }
};
