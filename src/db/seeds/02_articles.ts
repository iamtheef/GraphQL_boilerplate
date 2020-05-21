import * as Knex from "knex";
import { ids, title, body, articlesIds } from "./mockData";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("articles")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("articles").insert([
        {
          id: articlesIds[0],
          title: title[0],
          body: body[0],
          authorID: ids[0],
          createdAt: knex.fn.now(),
        },
        {
          id: articlesIds[1],
          title: title[1],
          body: body[1],
          authorID: ids[1],
          createdAt: knex.fn.now(),
        },
        {
          id: articlesIds[2],
          title: title[2],
          body: body[2],
          authorID: ids[0],
          createdAt: knex.fn.now(),
        },
        {
          id: articlesIds[3],
          title: title[3],
          body: body[3],
          authorID: ids[2],
          createdAt: knex.fn.now(),
        },
      ]);
    });
}
