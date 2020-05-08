import knex from "knex";
import { GQL_QueryResolvers } from "schema/schema";
// import { isAuthorQueried } from "@utils/isFieldQueried";
import { unexpectedError } from "@errors/index";

export const publicFeed: GQL_QueryResolvers["publicFeed"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    return null;
    // let Query = Articles.find().sort({ createdAt: -1 });
    // isAuthorQueried(info) && Query.populate("author");

    // return await Query;
  } catch (e) {
    console.error(e.message);
    throw unexpectedError;
  }
};
