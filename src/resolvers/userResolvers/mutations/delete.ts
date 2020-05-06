import { GQL_MutationResolvers } from "schema/schema";
import knex from "knex";
import { UnauthorizedAction } from "@errors/index";

export const deleteAcc: GQL_MutationResolvers["deleteAcc"] = async (
  _,
  { id },
  { req }
) => {
  try {
    // if (req.user.id !== id && !req.user.isAdmin) return UnauthorizedAction;

    // return {
    //   success: !!(await Users.findByIdAndDelete(id)),
    //   errors: [],
    // };
    return null;
  } catch (e) {
    throw Error(e.message);
  }
};
