import * as Knex from "knex";
import { hashSync } from "bcryptjs";
// import { v4 as uuidv4 } from "uuid";
import { ids, email, fullName } from "./mockData";

export function passHash() {
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
          fullName: fullName[0],
          email: email[0],
          password: passHash(),
          isAdmin: true,
          googleID: null,
          isGoogle: false,
          createdAt: knex.fn.now(),
        },
        {
          id: ids[1],
          fullName: fullName[1],
          email: email[1],
          password: passHash(),
          isAdmin: false,
          googleID: null,
          isGoogle: false,
          createdAt: knex.fn.now(),
        },
        {
          id: ids[2],
          fullName: fullName[2],
          email: email[2],
          password: passHash(),
          isAdmin: false,
          googleID: null,
          isGoogle: false,
          createdAt: knex.fn.now(),
        },
      ]);
    });
}
