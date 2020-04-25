import { Articles } from "@models/index";
import { GQL_QueryResolvers, GQL_PageInfo } from "schema/schema";

export const pageArticles: GQL_QueryResolvers["pageArticles"] = async (
  _,
  { cursors: { from, to } }
) => {
  try {
    const cache = await Articles.find();

    return {
      nodes: cache,
      hasNextPage: true,
      hasPreviousPage: false,
      from,
      to,
      total: cache.length,
    } as GQL_PageInfo;
  } catch (e) {
    throw Error(e.message);
  }
};
