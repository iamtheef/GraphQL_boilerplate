import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          fullName: "th",
          email: "mail@mail.com",
          password: "password",
          isAdmin: true,
          googleID: null,
          isGoogle: false,
        },
        {
          id: 2,
          fullName: "the",
          email: "mail2@mail.com",
          password: "password",
          isAdmin: false,
          googleID: null,
          isGoogle: false,
        },
        {
          id: 3,
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
