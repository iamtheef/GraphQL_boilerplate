import { redisClient } from "../../config/server-config";

export const incrementKey = async (key: string) => {
  return new Promise((resolve, reject) => {
    redisClient.incr(key, (err, value) => {
      if (err) reject(err);
      resolve(value);
    });
  });
};

export const getKey = async (key: string) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) reject(err);
      resolve(value);
    });
  });
};
