import knex from "../config/knex";
import { migrateDown, migrateUp } from "../src/resolvers/db_control";
import { graphqlTestCall } from "./gqlTestCall";
import * as queries from "./Queries";
import { redisClient } from "@config/server-config";
import { ids } from "../src/db/seeds/01_users";

beforeAll(async () => {
  await migrateUp();
  // for now we don't use redis client anywhere so we close it early in order for jest to be able to exit
  redisClient.end(true);
});

afterAll(async () => {
  await migrateDown();
  redisClient.end(true);
});

it("hello", () => {
  expect("hello all possible words").toBe("hello all possible words");
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
  it("allUsers", async () => {
    const output = await graphqlTestCall(queries.allUsers); // we query only email and fullName
    expect(output.data.allUsers).toHaveLength(3);
  });

  it("findUser", async () => {
    const output = await graphqlTestCall(queries.findUser, {
      input: { email: "mail@mail.com" },
    });
    console.log(output);
    expect(output.data.findUser).toHaveLength(1);
    expect(output.data.findUser).toEqual([
      { id: ids[0], email: "mail@mail.com", fullName: "th" },
    ]);
  });
});
