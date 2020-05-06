import { GQL_MutationResolvers } from "schema/schema";
import knex from "knex";
import { UnauthorizedAction, throwNewError } from "@errors/index";

export const editArticle: GQL_MutationResolvers["editArticle"] = async (
  _,
  { id, changes },
  { req }
) => {
  try {
    return null;
    // let foundArticle = await Articles.findById(id).populate("author"); // throws server error if the id is wrong or changed

    // if (req.user.id !== foundArticle.authorID) {
    //   return UnauthorizedAction.throwError();
    // }

    // foundArticle.set({ ...changes });

    // return { success: !!(await foundArticle.save()), errors: [] }; // responds success edited
  } catch (e) {
    return throwNewError([`${e.message}`]);
  }
};
