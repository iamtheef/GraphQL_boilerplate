import session from "express-session";
import redis from "redis";
import { currentEnv } from "@config/environment";

let RedisStore = require("connect-redis")(session);
export let redisClient = redis.createClient({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST || "local",
});

export const sessionMiddleware = () => {
  return session({
    name: "qid",
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,

    cookie: {
      httpOnly: true,
      secure: currentEnv === "PROD",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: new RedisStore({ client: redisClient }),
  });
};

export const corsOptions = {
  // this is used to prevent csrf attcaks so we check where the request comes from
  // we only whitelist our client server here
  origin: [/localhost/], // add here any other url you want to receive requests from

  // also set your client option "credentials" to "include" in order for cookies to work
  credentials: true,
};
