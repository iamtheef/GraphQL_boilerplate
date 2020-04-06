import { ArticleCollection } from "../../../models/index";
import { GQL_MutationResolvers } from "schema/schema";
import { Unauthorized, throwNewError } from "../../../errors/index";

export const removeArticle: GQL_MutationResolvers["removeArticle"] = async (
  _,
  { id, reqID }
) => {
  try {
    const toBeDeleted = await ArticleCollection.findById(id);
    if (toBeDeleted.authorID !== reqID) return Unauthorized.throwError();
    toBeDeleted.remove();
    return { success: true, errors: [] };
  } catch (e) {
    return throwNewError([{ path: "DELETE ARTICLE", message: `${e.message}` }]);
  }
};
