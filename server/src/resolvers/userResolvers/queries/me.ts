import { Users } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const me: GQL_QueryResolvers["me"] = async (
  _,
  __,
  {
    req: {
      user: { id },
    },
  }
) => {
  try {
    return await Users.findById(id).populate("articles");
  } catch (e) {
    throw Error(e.message);
  }
};
