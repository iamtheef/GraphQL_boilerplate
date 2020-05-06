import knex from "../../config/knex";
import {
  up as create_users,
  down as destroy_users,
} from "../db/migrations/20200504130026_create_users_table";

import {
  up as create_articles,
  down as destroy_articles,
} from "../db/migrations/20200504130650_create_articles_table";

import { seed as seed_users } from "../db/seeds/01_users";
import { seed as seed_articles } from "../db/seeds/02_articles";

export const migrateUp = async () => {
  try {
    await create_users(knex);
    await seed_users(knex);
    await create_articles(knex);
    await seed_articles(knex);
    return "DONE!";
  } catch (e) {
    return e.message;
  }
};

export const migrateDown = async () => {
  try {
    await destroy_users(knex);
    await destroy_articles(knex);
    return "DONE!";
  } catch (e) {
    return e.message;
  }
};