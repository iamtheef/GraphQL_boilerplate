import { GQL_PageInfo } from "schema/schema";
import { getResults } from "@utils/getArticles";

interface paginatorInput {
  Query: any;
  pageNumber: number;
  nodesPerPage: number;
  sorting: boolean;
}

export const paginator = async (input: paginatorInput) => {
  const { Query, pageNumber, nodesPerPage, sorting } = input;
  const results = await getResults(Query);

  if (pageNumber > 1) {
    Query.skip((pageNumber - 1) * nodesPerPage);
  }
  Query.limit(nodesPerPage);

  if (sorting) Query.sort({ createdAt: -1 });

  return {
    nodes: await Query,
    hasNextPage: results / nodesPerPage > pageNumber,
    hasPreviousPage: results / nodesPerPage < pageNumber,
    totalNodes: results,
    numberOfPages: Math.ceil(results / nodesPerPage),
  } as GQL_PageInfo;
};
