import DataLoader from "dataloader";
import knex from "@config/knex";
import { User } from "@models/User";
import groupBy from "lodash/groupBy";

type BatchUser = (ids: any) => Promise<User[]>;

const batchUsers: BatchUser = async (ids) => {
  const users = await knex("users").whereIn("id", ids);

  const groupedById = groupBy(users, "id");

  return ids.map((id: string) => groupedById[id] || []);
};

export const userLoader = new DataLoader<string, User>(batchUsers);
