import DataLoader from "dataloader";
import knex from "@config/knex";
import { User } from "@models/User";

export const userLoader = () => {
  return new DataLoader<string, User>(async (ids) => {
    const users = await knex("users").whereIn("id", ids);

    return ids.map((id) => users.forEach((row: User) => row.id === id));
  });
};
