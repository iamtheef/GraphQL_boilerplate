import { GQL_MutationResolvers } from "schema/schema";
import { ArticleCollection, UserCollection } from "../../../models/index";
import { throwNewError } from "../../../errors/index";

export const createArticle: GQL_MutationResolvers["createArticle"] = async (
  _,
  { input }
) => {
  try {
    // first make sure the id is right, if not found throws server error
    await UserCollection.findById(input.authorID);

    //create the artcile
    const newArticle = await ArticleCollection.create({
      ...input,
    });

    // responds
    return {
      success: true,
      articleID: newArticle._id,
      errors: [],
    };
  } catch (e) {
    return throwNewError([{ path: "NEW ARTICLE", message: `${e.message}` }]); // server error handling
  }
};
