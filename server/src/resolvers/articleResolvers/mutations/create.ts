import { GQL_MutationResolvers } from "schema/schema";
import { Articles, Users } from "@models/index";
import { throwNewError } from "@errors/index";

export const createArticle: GQL_MutationResolvers["createArticle"] = async (
  _,
  { input },
  { req }
) => {
  try {
    const foundUser = await Users.findById(req.user.id);

    const newArticle = {
      ...input,
      author: req.user.id,
      authorID: req.user.id,
    };

    const newArticleID = (await Articles.create(newArticle))._id;
    foundUser.articles.push(newArticleID);
    await foundUser.save();

    // responds
    return {
      success: true,
      articleID: newArticleID,
      errors: [],
    };
  } catch (e) {
    return throwNewError([{ path: "NEW ARTICLE", message: `${e.message}` }]); // server error handling
  }
};
