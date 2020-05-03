import { GQL_Article } from "schema/schema";
export interface mergeUpdates {
  results: GQL_Article[];
  resultsIndex: string[];
}

export interface mergeInput {
  foundArticles: GQL_Article[];
  results: GQL_Article[];
  resultsIndex: string[];
}

export const merge = ({
  foundArticles,
  results,
  resultsIndex,
}: mergeInput): mergeUpdates => {
  Object.values(foundArticles).forEach((article) => {
    if (resultsIndex.indexOf(article.id) < 0) {
      results.push(article);
      resultsIndex.push(article.id);
    }
  });

  return { results, resultsIndex };
};
