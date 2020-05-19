import knex from "../config/knex";
import { migrateDown, migrateUp } from "../src/resolvers/db_control";
import * as userResolvers from "@resolvers/userResolvers/index";

it("seeding db", async () => {
  await migrateUp();
});

it("hello", () => {
  expect("hello all possible words").toBe("hello all possible words");
});

it("count users", async () => {
  expect(await knex("users")).toHaveLength(3);
});

it("is user registered", async () => {
  const output = userResolvers.userQueries.isUserRegistered(
    {},
    { email: "mai@mail.com" },
    {}
  );
});

it("finishing & cleaning db", async () => {
  await migrateDown();
  await knex.destroy();
});
