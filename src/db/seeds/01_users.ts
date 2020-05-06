import * as Knex from "knex";
import { v4 as uuidv4 } from "uuid";

export const ids = [`${uuidv4()}`, `${uuidv4()}`, `${uuidv4()}`];

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
          password: "password",
          isAdmin: true,
          googleID: null,
          isGoogle: false,
        },
        {
          id: ids[1],
          fullName: "the",
          email: "mail2@mail.com",
          password: "password",
          isAdmin: false,
          googleID: null,
          isGoogle: false,
        },
        {
          id: ids[2],
          fullName: "t",
          email: "mail3@mail.com",
          password: "password",
          isAdmin: false,
          googleID: null,
          isGoogle: false,
        },
      ]);
    });
}
