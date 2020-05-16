import { migrateDown } from "../src/resolvers/db_control";

async () => {
  await migrateDown();
};
