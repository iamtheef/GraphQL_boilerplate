import { ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers, GQL_Article } from "schema/schema";
import { merge, mergeUpdates, mergeInput } from "../../../utils/mergeArticles";

// multiple fields search for users
export const findArticle: GQL_QueryResolvers["findArticle"] = async (
  _,
  { input }
) => {
  try {
    // if any of the fields is included return the corresponding results
    let foundArticles: Array<GQL_Article> = []; // foundArticles is used to pick up the results from each query case and then merge them into results array
    let results: Array<GQL_Article> = []; // results is used for merging everything togetther
    const { keywords, authorID, createdAt } = input;
    let resultsIndex: string[] = []; // keeps track of what articles are in the results array (based on ids)
    let updates: mergeUpdates; // merge custom interface (returns updates for the results array and the index array)

    if (keywords.length) {
      foundArticles = await ArticleCollection.find({
        $text: { $search: `${keywords}`, $caseSensitive: false },
      });

      // merging
      updates = merge({ foundArticles, results, resultsIndex });
      resultsIndex = updates.resultsIndex;
      results = updates.results;
    }

    if (authorID) {
      foundArticles = await ArticleCollection.find({ authorID });

      //merging
      updates = merge({ foundArticles, results, resultsIndex });
      resultsIndex = updates.resultsIndex;
      results = updates.results;
    }

    if (createdAt) {
      foundArticles = await ArticleCollection.find({ createdAt });

      // merging
      updates = merge({ foundArticles, results, resultsIndex });
      resultsIndex = updates.resultsIndex;
      results = updates.results;
    }

    return results; // results array
  } catch (e) {
    throw new Error(e.message);
  }
};
