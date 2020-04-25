import { redisClient } from "@config/server-config";
import { getKey } from "./redis";
import { Articles } from "@models/index";

// caching the length of all the articles
export const getArticles = async () => {
  if (!(await getKey("articles"))) {
    redisClient.set("articles", `${(await Articles.find()).length}`);
    redisClient.expire("articles", 60 * 2); // for 2 minutes
  }

  return Number(await getKey("articles"));
};
