import { Users } from "@models/User";
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
    console.log("ID : ", id);
    return await Users.where("id", id);
  } catch (e) {
    throw Error(e.message);
  }
};
