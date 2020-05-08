import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
import { isArticleQueried } from "@utils/isFieldQueried";

export const allUsers: GQL_QueryResolvers["allUsers"] = async (
  _,
  __,
  ___,
  info
) => {
  function hydrate(books: any) {
    return books.map((x: any) => ({
      ...x,
      articles: {
        id: x.authorID,
        title: x.title,
        body: x.body,
      },
    }));
  }
  try {
    let Query = knex("users");
    isArticleQueried(info) &&
      Query.leftJoin("articles", "articles.authorID", "users.id");

    return hydrate(await Query);
  } catch (e) {
    throw Error(e.message);
  }
};
