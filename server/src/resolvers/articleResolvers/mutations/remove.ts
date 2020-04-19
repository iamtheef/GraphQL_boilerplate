import { Articles } from "@models/index";
import { GQL_MutationResolvers } from "schema/schema";
import { UnauthorizedAction, throwNewError } from "@errors/index";

export const removeArticle: GQL_MutationResolvers["removeArticle"] = async (
  _,
  { id },
  { req }
) => {
  try {
    const toBeDeleted = await Articles.findById(id);

    if (!req.isAuthenticated() || toBeDeleted.authorID !== req.user.id) {
      return UnauthorizedAction.throwError();
    }

    await toBeDeleted.remove();

    return { success: true, errors: [] };
  } catch (e) {
    return throwNewError([{ path: "DELETE ARTICLE", message: `${e.message}` }]);
  }
};
