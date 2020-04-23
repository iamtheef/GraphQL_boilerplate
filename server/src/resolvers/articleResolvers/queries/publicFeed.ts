import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "@utils/isFieldQueried";

export const publicFeed: GQL_QueryResolvers["publicFeed"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    let Query = Articles.find().sort({ createdAt: -1 });
    isFieldQueried(info, "author") && Query.populate("author");

    return await Query;
  } catch (e) {
    throw Error(e.message);
  }
};
