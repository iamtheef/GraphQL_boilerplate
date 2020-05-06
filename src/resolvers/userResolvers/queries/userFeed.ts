import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";
import { isAuthorQueried } from "@utils/isFieldQueried";

export const userFeed: GQL_QueryResolvers["userFeed"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    // let Query = Articles.find().sort({ createdAt: -1 });
    // isAuthorQueried(info) && Query.populate("author");

    // return await Query;
    return null;
  } catch (e) {
    throw Error(e.message);
  }
};
