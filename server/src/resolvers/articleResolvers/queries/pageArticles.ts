import { Articles } from "@models/index";
import { GQL_QueryResolvers, GQL_PageInfo } from "schema/schema";
import { getKey } from "@utils/redis";
import { redisClient } from "@config/server-config";

export const pageArticles: GQL_QueryResolvers["pageArticles"] = async (
  _,
  { pageSpecs: { nodesPerPage, pageNumber, sorting } }
) => {
  // caching the length of all the articles
  if (!(await getKey("articles"))) {
    redisClient.set("articles", `${(await Articles.find()).length}`);
    redisClient.expire("articles", 60 * 2); // for 2 minutes
  }

  try {
    let allArticles = Number(await getKey("articles"));
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
      hasPreviousPage: allArticles / nodesPerPage <= pageNumber,
      totalNodes: allArticles,
      numberOfPages: Math.floor(allArticles / nodesPerPage),
    } as GQL_PageInfo;
  } catch (e) {
    throw Error(e.message);
  }
};
