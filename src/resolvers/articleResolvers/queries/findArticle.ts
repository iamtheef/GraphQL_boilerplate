import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isAuthorQueried } from "@utils/isFieldQueried";
// import { merge, mergeUpdates } from "../../../utils/mergeArticles";
import { paginator } from "@utils/paginator";

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
    let Query;

    if (keywords) {
      Query = Articles.find({
        $text: { $search: `${keywords}`, $caseSensitive: false },
      });
    }

    if (authorID) {
      keywords
        ? Query.find({ authorID })
        : (Query = Articles.find({ authorID }));
    }

    if (createdAt) {
      keywords || authorID
        ? Query.find({ createdAt })
        : (Query = Articles.find({ createdAt }));
    }

    isAuthorQueried(info) && Query.populate("author"); // checks if author is queried and populates

    return paginator({
      Query,
      pageNumber,
      nodesPerPage,
      sorting,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
