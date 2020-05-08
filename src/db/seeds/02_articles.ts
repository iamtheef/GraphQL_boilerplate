import * as Knex from "knex";
import { ids } from "./01_users";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("articles")
    .del()
    .then(() => {
      console.log(ids);
      // Inserts seed entries
      return knex("articles").insert([
        {
          id: `${uuidv4()}`,
          title: "lol",
          body: "random text here, lorem ipsum",
          authorID: ids[0],
        },
        {
          id: `${uuidv4()}`,
          title: "lol2",
          body: "random textsa here, lorem ipsum",
          authorID: ids[1],
        },
        {
          id: `${uuidv4()}`,
          title: "lol3",
          body: "lorem ipsum333",
          authorID: ids[0],
        },
        {
          id: `${uuidv4()}`,
          title: "lol4",
          body: "random 444lorem ipsum",
          authorID: ids[2],
        },
      ]);
    });
}
