import { redisClient } from "../../config/server-config";
import { Request } from "express";
import { GraphQLResolveInfo } from "graphql";

const ONE_DAY = 60 * 60 * 24;
const LIMIT = 8;

const incrementKey = async (key: string) => {
  return new Promise((resolve, reject) => {
    redisClient.incr(key, (err, value) => {
      if (err) reject(err);
      resolve(value);
    });
  });
};

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
