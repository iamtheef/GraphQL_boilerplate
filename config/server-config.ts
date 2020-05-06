import session from "express-session";
import redis from "redis";
import knex from "@config/knex";
import { up as create_users } from "../src/db/migrations/20200504130026_create_users_table";
import { migrateUp } from "../src/resolvers/db_control";

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

export const corsOptions = {
  origin: "http://localhost:4000/graphql",
  credentials: true,
};

// initialising db
export const initDB = async () => {
  if (!(await knex.schema.hasTable("users")) && process.env.ENV === "dev") {
    await migrateUp();
    console.log("DB CREATED AND SEEDED");
  } else if (
    !((await knex.schema.hasTable("users")) && process.env.ENV === "prod")
  ) {
    await create_users(knex);
  }
};
