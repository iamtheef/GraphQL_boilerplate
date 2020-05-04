import Knex from "knex";

const TABLE_NAME = "users";

export async function up(knex: Knex): Promise<any> {
  const tableExists = await knex.schema.hasTable(TABLE_NAME);

  if (!tableExists) {
    await knex.schema.createTable(TABLE_NAME, (t) => {
      t.integer("id")
        .primary()
        .notNullable()
        .unique();
      t.string("fullName", 100).notNullable();
      t.string("email", 100)
        .unique()
        .notNullable();
      t.string("password", 100).notNullable();
      t.boolean("isAdmin");
      t.string("googleID");
      t.boolean("isGoogle");
      t.timestamps();
    });
  }
}

export const down = async (knex: Knex): Promise<any> => {
  await knex.schema.dropTableIfExists(TABLE_NAME);
};
