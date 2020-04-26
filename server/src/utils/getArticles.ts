import { redisClient } from "@config/server-config";
import { getKey } from "./redis";

// caching the length of all the articles
export const getArticles = async (reqIP: string, Query: any) => {
  const key = `articles:${reqIP}:${Query}`;
  if (!(await getKey(key))) {
    redisClient.set(key, `${(await Query).length}`);
    redisClient.expire(key, 60 * 2); // for 2 minutes
  }

  return Number(await getKey(key));
};
