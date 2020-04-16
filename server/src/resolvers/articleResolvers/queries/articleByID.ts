import { Articles } from "@models/index";
import { GQL_QueryResolvers } from "schema/schema";

export const articleByID: GQL_QueryResolvers["articleByID"] = async (
  _,
  { id }
) => {
  try {
    return await Articles.findById(id).populate("author");
  } catch (e) {
    throw Error(e.message);
  }
};
