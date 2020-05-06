import knex from "@config/knex";
import { GQL_QueryResolvers } from "schema/schema";
import { isArticleQueried } from "@utils/isFieldQueried";

export const allUsers: GQL_QueryResolvers["allUsers"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    // let Query = knex.select("*").from("users");
    // isArticleQueried(info) && Query.populate("articles");

    // return await Query;
    return null;
  } catch (e) {
    throw Error(e.message);
  }
};
