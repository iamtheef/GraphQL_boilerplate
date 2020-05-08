import knex from "@config/knex";
import { GQL_MutationResolvers } from "schema/schema";
import { UnauthorizedAction } from "@errors/index";

export const deleteAcc: GQL_MutationResolvers["deleteAcc"] = async (
  _,
  { id },
  { req }
) => {
  try {
    if (req.user.id !== id && !req.user.isAdmin) return UnauthorizedAction;
    req.logout();
    return {
      success: !!(await knex("users")
        .where("id", id)
        .first()
        .del()),
      errors: [],
    };
  } catch (e) {
    throw Error(e.message);
  }
};
