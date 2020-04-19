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
    if (!req.user) throw new Error("Please login first"); // returns empty if no user is logged in

    let Query = Articles.find();
    isFieldQueried(info, "author") && Query.populate("author");
    return await Query;
  } catch (e) {
    throw Error(e.message);
  }
};
