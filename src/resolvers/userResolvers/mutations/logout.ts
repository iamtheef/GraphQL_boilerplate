import { GQL_MutationResolvers } from "schema/schema";

export const logout: GQL_MutationResolvers["logout"] = async (
  _,
  __,
  { req }
) => {
  try {
    if (!req.isAuthenticated()) throw new Error("Not logged in.");

    req.logout();
    return true;
  } catch (e) {
    throw Error(e.message);
  }
};
