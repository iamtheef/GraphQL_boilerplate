import * as dotenv from "dotenv";
import session from "express-session";
import redis from "redis";

const { SECRET, ENV, REDIS_PORT } = dotenv.config().parsed;
let RedisStore = require("connect-redis")(session);
export let redisClient = redis.createClient({
  port: Number(REDIS_PORT),
});

export const sessionMiddleware = () => {
  return session({
    name: "qid",
    secret: SECRET,
    saveUninitialized: false,
    resave: false,

    cookie: {
      httpOnly: true,
      secure: ENV === "prod",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: new RedisStore({ client: redisClient }),
  });
};

export const db_opts = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};
