import { redisClient } from "@config/server-config";
import { getKey } from "./redis";

// caching the length of all the articles
export const getResults = async (Query: any) => {
  const key = `${Query}`;

  if (!(await getKey(key))) {
    redisClient.set(key, `${(await Query).length}`);

    redisClient.expire(key, 60 * 2); // for 2 minutes
  }

  return Number(await getKey(key));
};
