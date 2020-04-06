import { GQL_MutationResolvers } from "schema/schema";
import { ArticleCollection } from "../../../models/index";
import { Unauthorized, throwNewError } from "../../../errors/index";

export const editArticle: GQL_MutationResolvers["editArticle"] = async (
  _,
  { id, changes }
) => {
  try {
    const { reqID, body, title } = changes;

    let foundArticle = await ArticleCollection.findById(id); // throws server error if the id is wrong or changed

    if (reqID !== foundArticle.authorID) return Unauthorized.throwError(); // checks if the changes were requested from the author of the article, if not returns error

    if (title) foundArticle.title = title; // update the title if one is passed in
    if (body) foundArticle.body = body; // update the body if a new body is passed in

    await foundArticle.save(); // saves the updated article

    return { success: true, errors: [] }; // responds success edited
  } catch (e) {
    return throwNewError([{ path: "EDIT", message: `${e.message}` }]);
  }
};
