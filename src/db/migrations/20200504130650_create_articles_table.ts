import Knex from "knex";

const TABLE_NAME = "articles";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists(TABLE_NAME);

  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.uuid("id").primary();
    t.string("title", 100);
    t.text("body");
    t.timestamp("createdAt");
    t.timestamp("updatedAt").defaultTo(null);

    t.uuid("authorID")
      .references("id")
      .inTable("users");
  });
}

export const down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTableIfExists(TABLE_NAME);
};
