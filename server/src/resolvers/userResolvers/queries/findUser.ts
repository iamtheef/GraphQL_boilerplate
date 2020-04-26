import { Users } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isArticleQueried } from "@utils/isFieldQueried";

// multiple fields search for users
export const findUser: GQL_QueryResolvers["findUser"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    let Query = Users.find(__.input);

    isArticleQueried(info) && Query.populate("articles");

    return await Query;
  } catch (e) {
    throw new Error(e.message);
  }
};
