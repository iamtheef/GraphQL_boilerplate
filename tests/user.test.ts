import knex from "../config/knex";
import { migrateDown, migrateUp } from "../src/resolvers/db_control";
import { graphqlTestCall } from "./gqlTestCall";
import * as queries from "./Queries";
import { redisClient } from "@config/server-config";

beforeAll(async () => {
  await migrateUp();
});

afterAll(async () => {
  await migrateDown();
  redisClient.end(true);
});

it("hello", () => {
  expect("hello all possible words").toBe("hello all possible words");
});

// tests migration
it("count users", async () => {
  expect(await knex("users")).toHaveLength(3);
});

// tests
describe("users", () => {
  it("is user registered", async () => {
    const output = await graphqlTestCall(queries.isUserRegistered, {
      email: "mail@mail.com",
    });
    expect(knex("users").where("email", "mail@mail.com")).toBeDefined();
    expect(output).toEqual({ data: { isUserRegistered: true } });
  });
});
