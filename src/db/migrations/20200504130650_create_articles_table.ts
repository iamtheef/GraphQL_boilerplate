import Knex from "knex";

export const up = async (knex: Knex): Promise<any> => {
  const tableExists = await knex.schema.hasTable("users");

  if (!tableExists) {
    await knex.schema.createTable("users", (t) => {
      t.uuid("id").primary();
      t.string("title", 100);
      t.text("body");
      t.timestamps();

      t.foreign("authorID")
        .references("id")
        .inTable("users");
    });
  }
};

export const down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTableIfExists("users");
};
