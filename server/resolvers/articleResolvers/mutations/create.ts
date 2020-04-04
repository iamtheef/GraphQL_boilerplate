import { GQL_MutationResolvers } from "schema/schema";
import { Article, User } from "../../../models/index";
import { userNotFound } from "../../../errors/articles";

export const createArticle: GQL_MutationResolvers["createArticle"] = async (
  _,
  { input }
) => {
  try {
    const foundUser = await User.findById(input.authorID);
    if (!foundUser) return userNotFound;
    const newArticle = await Article.create({
      ...input,
    });
    foundUser.articles.push(newArticle._id);
    foundUser.save();
    return {
      success: true,
      articleID: newArticle._id,
      errors: [],
    };
  } catch (e) {
    throw Error(e.message);
  }
};
