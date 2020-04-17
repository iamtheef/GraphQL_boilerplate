import * as dotenv from "dotenv";
import session from "express-session";
import redis from "redis";

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();
const { SECRET, PORT, ENV } = dotenv.config().parsed;

export const sessionMiddleware = () => {
  return session({
    name: "qid",
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    // store: new RedisStore({ client: redisClient }),

    cookie: {
      httpOnly: true,
      secure: ENV === "prod",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  });
};

export const db_opts = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

export const corsOpts = {
  credentials: true,
  origin: `http://localhost:${PORT}`,
};
