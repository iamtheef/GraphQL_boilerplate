import DataLoader from "dataloader";
import knex from "@config/knex";
import { User } from "@models/User";

type BatchUser = (ids: any) => Promise<User[]>;

const batchUsers: BatchUser = async (ids) => {
  const users = await knex("users").whereIn("id", ids);
  const UsersMap: { [key: string]: User } = {};

  users.forEach((u: User) => {
    UsersMap[u.id] = u;
  });

  return ids.map((id: string) => UsersMap[id] || null);
};

export const userLoader = new DataLoader<string, User>(batchUsers);
