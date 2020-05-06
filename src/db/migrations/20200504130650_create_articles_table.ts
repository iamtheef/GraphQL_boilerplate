import Knex from "knex";

const TABLE_NAME = "articles";

export async function up(knex: Knex): Promise<any> {
  const tableExists = await knex.schema.hasTable(TABLE_NAME);

  if (!tableExists) {
    await knex.schema.createTable(TABLE_NAME, (t) => {
      t.integer("id").primary();
      t.string("title", 100);
      t.text("body");
      t.timestamps();

      t.integer("authorID")
        .references("id")
        .inTable("users");
    });
  }
}

export const down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTableIfExists(TABLE_NAME);
};
