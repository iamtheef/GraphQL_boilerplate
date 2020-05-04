import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("articles")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("articles").insert([
        {
          id: 1,
          title: "lol",
          body: "random text here, lorem ipsum",
          authorID: 1,
        },
        {
          id: 2,
          title: "lol2",
          body: "random textsa here, lorem ipsum",
          authorID: 2,
        },
        { id: 3, title: "lol3", body: "lorem ipsum333", authorID: 1 },
        { id: 4, title: "lol4", body: "random 444lorem ipsum", authorID: 3 },
      ]);
    });
}
