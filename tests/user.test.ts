import { migrateDown, migrateUp } from "../src/resolvers/db_control";
import { graphqlTestCall } from "./gqlTestCall";
import * as queries from "./Queries";
import * as mutations from "./Mutations";
import { redisClient } from "@config/server-config";
import { ids, email, fullName } from "../src/db/seeds/mockData";

beforeAll(async () => {
  redisClient.end(true);

  await migrateUp();
  // // for now we don't use redis client anywhere so we close it early in order for jest to be able to exit
});

afterAll(async () => {
  await migrateDown();
});

it("hello", () => {
  expect("hello all possible words").toBe("hello all possible words");
});

// tests
// describe("users", () => {
// it("is user registered", async () => {
//   const output = await graphqlTestCall(queries.isUserRegistered, {
//     email: email[0],
//   });
//   expect(output).toEqual({ data: { isUserRegistered: true } });
// });
// it("allUsers", async () => {
//   const output = await graphqlTestCall(queries.allUsers); // we query only email and fullName
//   expect(output.data.allUsers).toHaveLength(3);
// });
// });

// describe("findUser", () => {
//   it("find by email", async () => {
//     const output = await graphqlTestCall(queries.findUser, {
//       input: { email: email[0] },
//     });

//     expect(output.data.findUser).toHaveLength(1);
//     expect(output.data.findUser).toEqual([
//       { id: ids[0], email: email[0], fullName: fullName[0], isAdmin: true },
//     ]);
//   });

//   it("find by fullName", async () => {
//     const output = await graphqlTestCall(queries.findUser, {
//       input: { fullName: fullName[1] },
//     });

//     expect(output.data.findUser).toHaveLength(1);
//     expect(output.data.findUser).toEqual([
//       { id: ids[1], email: email[1], fullName: fullName[1], isAdmin: false },
//     ]);
//   });
// });

describe("login & me", () => {
  it("successful login function", async () => {
    const login = await graphqlTestCall(mutations.login, {
      input: { email: email[0], password: "password" },
    });
    expect(login.data.login).toEqual({ success: true, errors: [] });
    expect(login.data.login).not.toBe(null);

    const me = await graphqlTestCall(queries.me, {}, ids[0]);

    expect(me.data.me).toEqual({
      id: ids[0],
      fullName: fullName[0],
      isAdmin: true,
      email: email[0],
    });
    expect(me).not.toBe(null);
    const logout = await graphqlTestCall(mutations.logout);
    expect(logout.data).toEqual({ logout: true });
  });

  it("wrong login function", async () => {
    const login = await graphqlTestCall(mutations.login, {
      input: { email: email[0], password: "wrong password" },
    });
    expect(login).toEqual({
      data: {
        login: {
          success: false,
          errors: ["Wrong Credentials"],
        },
      },
    });
    const me = await graphqlTestCall(queries.me, {}, null);
    expect(me).toEqual({ data: { me: null } });
  });
});
