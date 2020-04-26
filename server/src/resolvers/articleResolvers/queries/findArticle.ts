import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "@utils/isFieldQueried";
// import { merge, mergeUpdates } from "../../../utils/mergeArticles";
import { paginator, paginatorInput } from "@utils/paginator";

// filter search for articles
export const findArticle: GQL_QueryResolvers["findArticle"] = async (
  _,
  __,
  { req },
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

    isFieldQueried(info, "author") && Query.populate("author"); // checks if author is queried and populates
    const input: paginatorInput = {
      reqIP: req.ip,
      Query,
      pageNumber,
      nodesPerPage,
      sorting,
    };
    return paginator(input);
  } catch (e) {
    throw new Error(e.message);
  }
};
