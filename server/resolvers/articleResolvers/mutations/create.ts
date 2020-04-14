import { GQL_MutationResolvers } from "schema/schema";
import { Articles, Users } from "../../../models/index";
import { throwNewError } from "../../../errors/index";

export const createArticle: GQL_MutationResolvers["createArticle"] = async (
  _,
  { input }
) => {
  try {
    // first make sure the id is right, if not found throws server error
    const foundUser = await Users.findById(input.authorID);

    //create the artcile
    const newArticle = {
      ...input,
      author: foundUser._id
    };
    const newArticleID = (await Articles.create(newArticle))._id;
    foundUser.articles.push(newArticleID);
    await foundUser.save();

    // responds
    return {
      success: true,
      articleID: newArticleID,
      errors: []
    };
  } catch (e) {
    return throwNewError([{ path: "NEW ARTICLE", message: `${e.message}` }]); // server error handling
  }
};
