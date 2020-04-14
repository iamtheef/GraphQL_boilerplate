import { GQL_MutationResolvers } from "schema/schema";
import { Articles } from "../../../models/index";
import { Unauthorized, throwNewError } from "../../../errors/index";

export const editArticle: GQL_MutationResolvers["editArticle"] = async (
  _,
  { id, changes }
) => {
  try {
    const { reqID } = changes;

    let foundArticle = await Articles.findById(id).populate("author"); // throws server error if the id is wrong or changed
    console.log(foundArticle);

    // if (reqID !== foundArticle.author) return Unauthorized.throwError(); // checks if the changes were requested from the author of the article, if not returns error
    foundArticle.set({ ...changes });

    return { success: !!(await foundArticle.save()), errors: [] }; // responds success edited
  } catch (e) {
    return throwNewError([{ path: "EDIT", message: `${e.message}` }]);
  }
};
