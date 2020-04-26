import { GQL_PageInfo } from "schema/schema";
import { getArticles } from "@utils/getArticles";

export interface paginatorInput {
  reqIP: string;
  Query: any;
  pageNumber: number;
  nodesPerPage: number;
  sorting: boolean;
}

export const paginator = async (input: paginatorInput) => {
  const { reqIP, Query, pageNumber, nodesPerPage, sorting } = input;
  const allArticles = await getArticles(reqIP, Query);

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
};
