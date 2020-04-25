import { Articles } from "@models/index";
import { GQL_QueryResolvers, GQL_PageInfo } from "schema/schema";

export const pageArticles: GQL_QueryResolvers["pageArticles"] = async (
  _,
  { cursors: { nodesPerPage, pageNumber, sorting } }
) => {
  try {
    let allArticles = await Articles.find();
    let Query = Articles.find();

    if (pageNumber > 1) {
      Query.skip(pageNumber * (nodesPerPage > 1 ? nodesPerPage - 1 : 1));
    }
    Query.limit(nodesPerPage);
    if (sorting) Query.sort({ createdAt: -1 });
    const articles = await Query;

    return {
      nodes: articles,
      hasNextPage: allArticles.length / nodesPerPage > pageNumber,

      hasPreviousPage: allArticles.length / nodesPerPage < pageNumber,

      totalNodes: allArticles.length,

      numberOfPages: Math.floor(allArticles.length / nodesPerPage),
    } as GQL_PageInfo;
  } catch (e) {
    throw Error(e.message);
  }
};
