import { Articles } from "@models/index";
import { GQL_QueryResolvers, GQL_PageInfo } from "schema/schema";
import { getArticles } from "@utils/getAllArticles";

export const pageArticles: GQL_QueryResolvers["pageArticles"] = async (
  _,
  { pageSpecs: { nodesPerPage, pageNumber, sorting } }
) => {
  try {
    const allArticles = await getArticles(); // getting the length of all the articles in the db

    let Query = Articles.find();

    if (pageNumber > 1) {
      Query.skip((pageNumber - 1) * nodesPerPage);
    }

    Query.limit(nodesPerPage);

    if (sorting) Query.sort({ createdAt: -1 });
    const articles = await Query;

    return {
      nodes: articles,
      hasNextPage: allArticles / nodesPerPage > pageNumber,
      hasPreviousPage: allArticles / nodesPerPage < pageNumber,
      totalNodes: allArticles,
      numberOfPages: Math.ceil(allArticles / nodesPerPage),
    } as GQL_PageInfo;
  } catch (e) {
    throw Error(e.message);
  }
};
