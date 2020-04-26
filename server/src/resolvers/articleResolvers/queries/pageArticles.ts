import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { paginator, paginatorInput } from "@utils/paginator";

export const pageArticles: GQL_QueryResolvers["pageArticles"] = async (
  _,
  { pageSpecs: { nodesPerPage, pageNumber, sorting } },
  { req: { ip } }
) => {
  try {
    const input: paginatorInput = {
      reqIP: ip,
      Query: Articles.find(),
      pageNumber,
      nodesPerPage,
      sorting,
    };

    return paginator(input);
  } catch (e) {
    throw Error(e.message);
  }
};
