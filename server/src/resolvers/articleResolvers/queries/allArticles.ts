import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "@utils/isFieldQueried";

export const allArticles: GQL_QueryResolvers["allArticles"] = async (
  _,
  __,
  { req },
  info
) => {
  try {
    if (!req.isAuthenticated()) throw new Error("Not logged in.");

    let Query = Articles.find();
    isFieldQueried(info, "author") && Query.populate("author");
    return await Query;
  } catch (e) {
    throw Error(e.message);
  }
};
