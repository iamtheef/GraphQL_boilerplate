import { Users } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "@utils/isFieldQueried";

export const allUsers: GQL_QueryResolvers["allUsers"] = async (
  _,
  __,
  { req },
  info
) => {
  try {
    let Query = Users.find();
    isFieldQueried(info, "articles") && Query.populate("articles");

    return await Query;
  } catch (e) {
    throw Error(e.message);
  }
};
