import { UserCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "../../../utils/isFieldQueried";

// multiple fields search for users
export const findUser: GQL_QueryResolvers["findUser"] = async (
  _,
  __,
  ___,
  info
) => {
  try {
    let Query = UserCollection.find(__.input);

    isFieldQueried(info, "articles") && Query.populate("articles");

    return await Query;
  } catch (e) {
    throw new Error(e.message);
  }
};
