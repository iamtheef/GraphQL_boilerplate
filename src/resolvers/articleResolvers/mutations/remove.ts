import knex from "@config/knex";
import { GQL_MutationResolvers } from "schema/schema";
import { UnauthorizedAction, unexpectedError } from "@errors/index";

export const removeArticle: GQL_MutationResolvers["removeArticle"] = async (
  _,
  { id },
  { req }
) => {
  try {
    const toBeDeleted = (await knex("articles").where("id", id))[0];

    if (toBeDeleted.authorID !== req.user.id) return UnauthorizedAction;

    const wasDeleted = !!knex("articles")
      .where("id", id)
      .del();

    return { success: wasDeleted, errors: [] };
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
