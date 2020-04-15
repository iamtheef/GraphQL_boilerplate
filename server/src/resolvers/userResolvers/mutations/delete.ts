import { GQL_MutationResolvers } from "schema/schema";
import { Users } from "../../../models/index";

export const deleteAcc: GQL_MutationResolvers["deleteAcc"] = async (
  _,
  { id }
) => {
  try {
    if (await Users.findByIdAndDelete({ _id: id.trim() })) return true;
    return false;
  } catch (e) {
    throw Error(e.message);
  }
};
