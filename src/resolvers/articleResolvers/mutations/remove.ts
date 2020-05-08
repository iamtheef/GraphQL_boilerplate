import knex from "knex";
import { GQL_MutationResolvers } from "schema/schema";
import { UnauthorizedAction, unexpectedError } from "@errors/index";

export const removeArticle: GQL_MutationResolvers["removeArticle"] = async (
  _,
  { id },
  { req }
) => {
  try {
    return null;
    // const toBeDeleted = await Articles.findById(id);

    // if (toBeDeleted.authorID !== req.user.id) return UnauthorizedAction;

    // return { success: !!(await toBeDeleted.remove()), errors: [] };
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
