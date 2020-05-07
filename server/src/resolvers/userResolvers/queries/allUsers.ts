import { Users } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isArticleQueried } from "@utils/isFieldQueried";

export const allUsers: GQL_QueryResolvers["allUsers"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    let Query = Users.find();
    isArticleQueried(info) && Query.populate("articles");

    return await Query;
  } catch (e) {
    throw Error(e.message);
  }
};