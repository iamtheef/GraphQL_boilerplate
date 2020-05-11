import { GQL_MutationResolvers } from "schema/schema";
import knex from "@config/knex";
import { UnauthorizedAction, unexpectedError } from "@errors/index";

export const editArticle: GQL_MutationResolvers["editArticle"] = async (
  _,
  { id, changes },
  { req }
) => {
  try {
    let article = await knex("articles")
      .select("authorID")
      .where("id", id)
      .first();

    // throws server error if the id is wrong or changed
    if (req.user.id !== article.authorID) {
      return UnauthorizedAction;
    }

    const wasUpdated = !!(await knex("articles").update(
      { ...changes, updatedAt: knex.fn.now() },
      ["id"]
    ));

    return { success: wasUpdated, errors: [] }; // responds success edited
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
