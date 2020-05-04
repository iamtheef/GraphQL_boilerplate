import Knex from "knex";

export const up = async (knex: Knex): Promise<any> => {
  const tableExists = await knex.schema.hasTable("users");

  if (!tableExists) {
    await knex.schema.createTable("users", (t) => {
      t.uuid("id").primary();
      t.string("fullName", 100);
      t.string("email", 100);
      t.string("password", 100);
      t.boolean("isGoogle");
      t.string("googleID");
      t.timestamps();
      t.boolean("isAdmin");
    });
  }
};

export const down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTableIfExists("users");
};
