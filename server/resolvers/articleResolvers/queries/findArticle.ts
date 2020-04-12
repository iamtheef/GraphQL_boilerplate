import { ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "../../../utils/isFieldQueried";
// import { merge, mergeUpdates } from "../../../utils/mergeArticles";

// filter search for articles
export const findArticle: GQL_QueryResolvers["findArticle"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    const { keywords, authorID, createdAt } = __.input;
    let Query;

    if (keywords) {
      Query = ArticleCollection.find({
        $text: { $search: `${keywords}`, $caseSensitive: false }
      });
    }

    if (authorID) {
      if (!keywords) Query = ArticleCollection.find({ authorID });
      else Query.find({ authorID });
    }

    if (createdAt) {
      keywords || authorID
        ? Query.find({ createdAt })
        : (Query = ArticleCollection.find({ createdAt }));
    }

    isFieldQueried(info, "author") && Query.populate("author"); // checks if author is queried and populates

    return await Query;
  } catch (e) {
    throw new Error(e.message);
  }
};
