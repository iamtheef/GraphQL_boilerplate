import session from "express-session";
import redis from "redis";

let RedisStore = require("connect-redis")(session);
export let redisClient = redis.createClient({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST || "local",
});

export const sessionMiddleware = () => {
  return session({
    name: "qid",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,

    cookie: {
      httpOnly: true,
      secure: process.env.ENV === "prod",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: new RedisStore({ client: redisClient }),
  });
};

export const db_opts = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: 5432,
};

export const corsOptions = {
  origin: "http://localhost:4000/graphql",
  credentials: true,
};
