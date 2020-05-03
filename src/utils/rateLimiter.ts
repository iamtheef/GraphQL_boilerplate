import { redisClient } from "../../config/server-config";
import { incrementKey } from "@utils/redis";
import { Request } from "express";

import { GraphQLResolveInfo } from "graphql";

const ONE_DAY = 60 * 60 * 24;
const LIMIT = 8;

export const exceedsRateLimit = async (
  req: Request,
  info: GraphQLResolveInfo
) => {
  const key = `rate-limit:${info.fieldName}:${req.ip}`;
  const current = await incrementKey(key);

  if (current > LIMIT) return true;
  if (current === 1) redisClient.expire(key, ONE_DAY);
  return false;
};
