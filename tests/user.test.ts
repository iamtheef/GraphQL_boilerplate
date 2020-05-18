import knex from "../config/knex";
import { migrateDown, migrateUp } from "../src/resolvers/db_control";
// import { currentEnv } from "@config/environment";

// const resolvers = require("../src/resolvers/index");

it("seeding db", async () => {
  await migrateUp();
});

it("hello", () => {
  expect("hello all possible words").toBe("hello all possible words");
});

it("count users", async () => {
  expect(await knex("users")).toHaveLength(3);
});

it("finishing & cleaning db", async () => {
  await migrateDown();
  await knex.destroy();
});
