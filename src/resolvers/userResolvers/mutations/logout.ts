import { GQL_MutationResolvers } from "schema/schema";

export const logout: GQL_MutationResolvers["logout"] = async (
  _,
  __,
  { req, res }
) => {
  try {
    req.session.destroy();
    req.logout();
    res.clearCookie("qid");
    return true;
  } catch (e) {
    throw Error(e.message);
  }
};
