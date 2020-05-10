import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
// import { isAuthorQueried } from "@utils/isFieldQueried";
import { paginator } from "@utils/paginator";
import { unexpectedError } from "@errors/index";

export const allArticles: GQL_QueryResolvers["allArticles"] = async (
  _,
  __,
  ___
) => {
  try {
    const { nodesPerPage, pageNumber, sorting } = __.pageSpecs;

    let Query = knex("articles");

    return paginator({
      db: "articles",
      Query,
      nodesPerPage,
      pageNumber,
      sorting,
    });
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
