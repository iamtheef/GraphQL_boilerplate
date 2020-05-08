import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";
import { isArticleQueried } from "@utils/isFieldQueried";
import { unexpectedError } from "@errors/index";

// multiple fields search for users
export const findUser: GQL_QueryResolvers["findUser"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    // let Query = Users.find(__.input);

    // isArticleQueried(info) && Query.populate("articles");

    // return await Query;
    return null;
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
