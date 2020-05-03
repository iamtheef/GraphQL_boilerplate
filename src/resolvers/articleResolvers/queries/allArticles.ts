import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isAuthorQueried } from "@utils/isFieldQueried";
import { paginator } from "@utils/paginator";

export const allArticles: GQL_QueryResolvers["allArticles"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    const { nodesPerPage, pageNumber, sorting } = __.pageSpecs;

    let Query = Articles.find();
    isAuthorQueried(info) && Query.populate("author");

    return paginator({
      Query,
      nodesPerPage,
      pageNumber,
      sorting,
    });
  } catch (e) {
    throw Error(e.message);
  }
};
