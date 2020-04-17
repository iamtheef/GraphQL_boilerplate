import { Users } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";
import { isFieldQueried } from "@utils/isFieldQueried";

export const allUsers: GQL_QueryResolvers["allUsers"] = async (
  _,
  __,
  { req, client },
  info
) => {
  try {
    if (req.isAuthenticated()) {
      let Query = Users.find();
      isFieldQueried(info, "articles") && Query.populate("articles");
      return await Query;
    } else {
      return null;
    }
  } catch (e) {
    throw Error(e.message);
  }
};
