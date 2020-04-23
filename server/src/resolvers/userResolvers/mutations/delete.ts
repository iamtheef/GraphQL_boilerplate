import { GQL_MutationResolvers } from "schema/schema";
import { Users } from "@models/index";

export const deleteAcc: GQL_MutationResolvers["deleteAcc"] = async (
  _,
  { id }
) => {
  try {
    return !!(await Users.findByIdAndDelete(id));
  } catch (e) {
    throw Error(e.message);
  }
};
