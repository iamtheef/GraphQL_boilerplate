import DataLoader from "dataloader";
import knex from "@config/knex";
import { Article } from "@models/Article";
import groupBy from "lodash/groupBy";

type BatchArticles = (ids: any) => Promise<Article[]>;

const batchArticles: BatchArticles = async (ids) => {
  const articles = await knex("articles").whereIn("authorID", ids);
  const groupedByAuthor = groupBy(articles, "authorID");

  return ids.map((id: string) => groupedByAuthor[id] || []);
};

export const articlesLoader = new DataLoader<string, Article>(batchArticles);
