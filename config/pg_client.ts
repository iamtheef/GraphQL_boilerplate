import { db_opts } from "@config/server-config";
import Knex from "knex";

export const client = Knex({
  client: "postgres",
  connection: async () => {
    return {
      ...db_opts,
    };
  },
});
