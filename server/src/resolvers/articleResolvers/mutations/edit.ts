import { GQL_MutationResolvers } from "schema/schema";
import { Articles } from "@models/index";
import { Unauthorized, throwNewError } from "@errors/index";

export const editArticle: GQL_MutationResolvers["editArticle"] = async (
  _,
  { id, changes },
  { req }
) => {
  try {
    let foundArticle = await Articles.findById(id).populate("author"); // throws server error if the id is wrong or changed

    if (req.user.id !== foundArticle.authorID)
      return throwNewError([{ path: "EDIT ARTICLE", message: "Unauthorized" }]); // checks if the changes were requested from the author of the article, if not returns error
    foundArticle.set({ ...changes });

    return { success: !!(await foundArticle.save()), errors: [] }; // responds success edited
  } catch (e) {
    return throwNewError([{ path: "EDIT", message: `${e.message}` }]);
  }
};
