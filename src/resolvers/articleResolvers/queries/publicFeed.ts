import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isAuthorQueried } from "@utils/isFieldQueried";

export const publicFeed: GQL_QueryResolvers["publicFeed"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    let Query = Articles.find().sort({ createdAt: -1 });
    isAuthorQueried(info) && Query.populate("author");

    return await Query;
  } catch (e) {
    throw Error(e.message);
  }
};