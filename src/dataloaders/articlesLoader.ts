import DataLoader from "dataloader";
import knex from "@config/knex";
import { Article } from "@models/Article";

type BatchArticles = (ids: any) => Promise<Article[]>;
const articlesMap: { [key: string]: Article[] } = {};

const batchArticles: BatchArticles = async (ids) => {
  const articles = await knex("articles").whereIn("authorID", ids);

  articles.forEach((a: Article) => {
    articlesMap[a.authorID] = [a];
  });
  console.log(ids.map((id: string) => articlesMap[id]));
  return ids.map((id: string) => articlesMap[id]);
};

export const articlesLoader = new DataLoader<string, Article>(batchArticles);
