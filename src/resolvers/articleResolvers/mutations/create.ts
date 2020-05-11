import { GQL_MutationResolvers } from "schema/schema";
import knex from "@config/knex";
import { unexpectedError } from "@errors/index";
import { v4 as uuidv4 } from "uuid";

export const createArticle: GQL_MutationResolvers["createArticle"] = async (
  _,
  { input },
  { req }
) => {
  try {
    const newArticle = await knex("articles").insert(
      {
        id: uuidv4(),
        ...input,
        createdAt: knex.fn.now(),
        authorID: req.user.id,
      },
      ["*"]
    );

    return {
      success: true,
      articleID: newArticle[0].id,
      errors: [],
    };
  } catch (e) {
    console.error(e.message);
    throw unexpectedError; // server error handling
  }
};
