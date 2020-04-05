import { UserCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const isUserRegistered: GQL_QueryResolvers["isUserRegistered"] = async (
  _,
  { email }
) => {
  if (await UserCollection.findOne({ email })) return true;
  return false;
};
