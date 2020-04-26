import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "@utils/isFieldQueried";
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
    isFieldQueried(info, "author") && Query.populate("author");

    return paginator({
      reqIP: ___.req.ip,
      Query,
      nodesPerPage,
      pageNumber,
      sorting,
    });
  } catch (e) {
    throw Error(e.message);
  }
};
