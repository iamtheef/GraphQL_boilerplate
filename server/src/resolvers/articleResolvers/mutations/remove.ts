import { Articles } from "@models/index";
import { GQL_MutationResolvers } from "schema/schema";
import { Unauthorized, throwNewError } from "@errors/index";

export const removeArticle: GQL_MutationResolvers["removeArticle"] = async (
  _,
  { id, reqID }
) => {
  try {
    const toBeDeleted = await Articles.findById(id);
    if (toBeDeleted.id !== reqID) return Unauthorized.throwError();
    await toBeDeleted.remove();
    return { success: true, errors: [] };
  } catch (e) {
    return throwNewError([{ path: "DELETE ARTICLE", message: `${e.message}` }]);
  }
};
