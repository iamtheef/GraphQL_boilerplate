import DataLoader from "dataloader";
import knex from "@config/knex";
import { Article } from "@models/Article";

export const articleLoader = () => {
  return new DataLoader<string, Article>(async (ids) => {
    const articles = await knex("articles").whereIn("id", ids);

    return ids.map((id) => articles.forEach((row: Article) => row.id === id));
  });
};
