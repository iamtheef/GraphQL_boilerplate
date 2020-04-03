import { User } from "../../../models/index";
import { GQL_QueryResolvers, GQL_User } from "schema/schema";

// multiple fields search for users
export const findUser: GQL_QueryResolvers["findUser"] = async (
  _,
  { input }
) => {
  try {
    let foundUsers: Array<GQL_User> | null = null;
    const { email, fullName, googleID, createdAt } = input;
    if (googleID) foundUsers = await User.find({ googleID: googleID });
    if (email) foundUsers = await User.find({ email: email });
    if (fullName && createdAt) {
      foundUsers = await User.find({
        fullName: fullName,
        createdAt: createdAt
      });
    }
    if (fullName) foundUsers = await User.find({ fullName: fullName });
    if (createdAt) foundUsers = await User.find({ createdAt: createdAt });
    return foundUsers;
  } catch (e) {
    throw Error(e.message);
  }
};
