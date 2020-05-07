import * as Knex from "knex";
import { v4 as uuidv4 } from "uuid";
import { compare, hashSync } from "bcryptjs";

export const ids = [`${uuidv4()}`, `${uuidv4()}`, `${uuidv4()}`];

function passHash() {
  return hashSync("password", 10);
}

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: ids[0],
          fullName: "th",
          email: "mail@mail.com",
          password: passHash(),
          isAdmin: true,
          googleID: null,
          isGoogle: false,
        },
        {
          id: ids[1],
          fullName: "the",
          email: "mail2@mail.com",
          password: passHash(),
          isAdmin: false,
          googleID: null,
          isGoogle: false,
        },
        {
          id: ids[2],
          fullName: "t",
          email: "mail3@mail.com",
          password: passHash(),
          isAdmin: false,
          googleID: null,
          isGoogle: false,
        },
      ]);
    });
}
