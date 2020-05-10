import { GQL_PageInfo } from "schema/schema";
import { getResults } from "@utils/getArticles";

interface paginatorInput {
  db: string;
  Query: any;
  pageNumber: number;
  nodesPerPage: number;
  sorting: boolean;
}

export const paginator = async (input: paginatorInput) => {
  const { db, Query, pageNumber, nodesPerPage, sorting } = input;
  const results = await getResults(Query);

  if (pageNumber > 1) {
    Query.offset((pageNumber - 1) * nodesPerPage);
  }
  Query.limit(nodesPerPage);

  if (sorting) Query.orderBy(`${db}.createdAt", "desc`);

  return {
    nodes: Query,
    hasNextPage: Math.floor(results / nodesPerPage) > pageNumber,
    hasPreviousPage: Math.ceil(results / nodesPerPage) < pageNumber,
    totalNodes: results,
    numberOfPages: Math.ceil(results / nodesPerPage),
  } as GQL_PageInfo;
};
