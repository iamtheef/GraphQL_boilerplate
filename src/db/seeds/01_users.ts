import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("users").insert([
    {
      _id: 1,
      fullName: "th",
      email: "mail@mail.com",
      passowrd: "password",
      isAdmin: true,
      googleID: null,
      isGoogle: false,
    },
    {
      _id: 2,
      fullName: "the",
      email: "mail2@mail.com",
      passowrd: "password",
      isAdmin: false,
      googleID: null,
      isGoogle: false,
    },
    {
      _id: 3,
      fullName: "t",
      email: "mail3@mail.com",
      passowrd: "password",
      isAdmin: false,
      googleID: null,
      isGoogle: false,
    },
  ]);
}
