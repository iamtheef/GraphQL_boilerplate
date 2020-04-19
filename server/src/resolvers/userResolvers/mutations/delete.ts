import { GQL_MutationResolvers } from "schema/schema";
import { Users } from "@models/index";

export const deleteAcc: GQL_MutationResolvers["deleteAcc"] = async (
  _,
  __,
  { req }
) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!req.isAuthenticated() || req.user.id !== user.id) return false;

    user.remove();

    return true;
  } catch (e) {
    throw Error(e.message);
  }
};
