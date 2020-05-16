import session from "express-session";
import redis from "redis";
import knex from "@config/knex";
import { up as create_users } from "../src/db/migrations/20200504130026_create_users_table";
import { migrateUp } from "../src/resolvers/db_control";
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
  // this is used to prevent csrf attcaks so we check where the request come from
  // we only whitelist our client server here
  origin: [/localhost/], // add here any other url you want to receive request from

  // also set your client option "credentials" to "include"
  credentials: true,
};

// initialising db
export const initDB = async () => {
  if (!(await knex.schema.hasTable("users")) && process.env.ENV === "DEV") {
    await migrateUp();
    console.log("DB CREATED AND SEEDED");
  } else if (
    !((await knex.schema.hasTable("users")) && process.env.ENV === "PROD")
  ) {
    await create_users(knex);
  }
};
