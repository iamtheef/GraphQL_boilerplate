import { graphqlTestCall } from "./gqlTestCall";
import * as queries from "./Queries";
import { redisClient } from "@config/server-config";
import * as mutations from "./Mutations";
import { ids, email, fullName } from "../src/db/seeds/mockData";
import knex from "@config/knex";

beforeAll(async () => {
  // cleaning and seeding the db
  await graphqlTestCall(mutations.migrateUp);
  // redis isn't used anywhere for now
  // redis connection throws error on exiting so we close it ealry here
  redisClient.end(true);
});

afterAll(async () => {
  // dropping the db
  await graphqlTestCall(mutations.migrateDown);
});

// tests
describe("users", () => {
  it("is user registered, correct email", async () => {
    const output = await graphqlTestCall(queries.isUserRegistered, {
      email: email[0],
    });
    expect(output).toEqual({ data: { isUserRegistered: true } });
  });
  it("is user registered, wrong email", async () => {
    const output = await graphqlTestCall(queries.isUserRegistered, {
      email: "this@email.com",
    });
    expect(output).toEqual({ data: { isUserRegistered: false } });
  });
  it("allUsers", async () => {
    const output = await graphqlTestCall(queries.allUsers); // we query only email and fullName
    expect(output.data.allUsers).toHaveLength(3);
  });
});

describe("findUser", () => {
  it("find by email", async () => {
    const output = await graphqlTestCall(queries.findUser, {
      input: { email: email[0] },
    });

    expect(output.data.findUser).toHaveLength(1);
    expect(output.data.findUser).toEqual([
      { id: ids[0], email: email[0], fullName: fullName[0], isAdmin: true },
    ]);
  });

  it("find by fullName", async () => {
    const output = await graphqlTestCall(queries.findUser, {
      input: { fullName: fullName[1] },
    });

    expect(output.data.findUser).toHaveLength(1);
    expect(output.data.findUser).toEqual([
      { id: ids[1], email: email[1], fullName: fullName[1], isAdmin: false },
    ]);
  });

  it("find by id", async () => {
    const output = await graphqlTestCall(queries.userById, { id: ids[2] });
    expect(output.data.userById).toEqual({
      email: email[2],
      fullName: fullName[2],
    });
  });
});

describe("login & me & logout", () => {
  it("valid credits", async () => {
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

  it("invalid credits", async () => {
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

describe("register", () => {
  it("valid user", async () => {
    const res = await graphqlTestCall(mutations.register, {
      input: {
        email: "testmail@mail.com",
        password: "Password!2",
        fullName: "any name",
      },
    });
    expect(res.data.register).toEqual({ success: true, errors: [] });
    expect(res.data.register).not.toBe(null);
    const newUser = (
      await knex("users").where("email", "testmail@mail.com")
    )[0];
    expect(newUser).toBeDefined();
  });

  it("invalid user", async () => {
    const res = await graphqlTestCall(mutations.register, {
      input: {
        email: "testmailmailcom",
        password: "pssw",
        fullName: "no 1",
      },
    });
    expect(res.data.register.success).toBe(false);
    expect(res.data.register.errors).toHaveLength(3);
    expect(res.data.register.errors).toEqual([
      "Password is not valid",
      "Name is not valid",
      "Email is not valid",
    ]);
  });
});

describe("update acc", () => {
  it("wrong password", async () => {
    const res = await graphqlTestCall(
      mutations.updateAcc,
      {
        input: {
          fullName: "new name",
          password: {
            oldPassword: "wrong password",
          },
        },
      },
      ids[1]
    );
    console.log(res.errors);

    expect(res.data.updateAcc).toEqual({
      success: false,
      errors: ["Password was invalid, try again."],
    });
    const updatedUser = (await knex("users").where("email", email[1]))[0];
    expect(updatedUser.fullName).toEqual(fullName[1]);
  });

  it("updating name", async () => {
    const res = await graphqlTestCall(
      mutations.updateAcc,
      {
        input: {
          fullName: "new name",
          password: {
            oldPassword: "password",
          },
        },
      },
      ids[1]
    );

    expect(res.data.updateAcc).toEqual({ success: true, errors: [] });
    const updatedUser = (await knex("users").where("email", email[1]))[0];
    expect(updatedUser.fullName).toEqual("new name");
  });
});
