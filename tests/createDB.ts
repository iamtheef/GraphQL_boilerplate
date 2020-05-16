import { migrateUp } from "../src/resolvers/db_control";

async () => {
  await migrateUp();
};
