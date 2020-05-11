import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
import { isAuthorQueried } from "@utils/isFieldQueried";
// import { merge, mergeUpdates } from "../../../utils/mergeArticles";
import { paginator } from "@utils/paginator";
import { unexpectedError } from "@errors/index";

// filter search for articles
export const findArticle: GQL_QueryResolvers["findArticle"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    const { keywords, authorID, createdAt } = __.input;
    const { pageNumber, nodesPerPage, sorting } = __.pageSpecs;
    let whereClause: { [key: string]: any } = {};
    let Query = knex("articles");

    if (keywords) {
      Query.where("body", "like", `%${keywords}%`).orWhere(
        "title",
        "like",
        `%${keywords}%`
      );
    }

    if (authorID) {
      whereClause["authorID"] = authorID;
    }

    if (createdAt) {
      whereClause["createdAt"] = createdAt;
    }

    Query.where(whereClause);

    return paginator({
      Query,
      pageNumber,
      nodesPerPage,
      sorting,
    });
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
