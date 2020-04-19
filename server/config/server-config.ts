import * as dotenv from "dotenv";
import session from "express-session";
const { SECRET, ENV } = dotenv.config().parsed;

const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

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
