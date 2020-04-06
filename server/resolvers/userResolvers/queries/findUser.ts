import { UserCollection } from "../../../models/index";
import { GQL_QueryResolvers, GQL_User } from "schema/schema";
import { throwNewError } from "../../../errors/index";

// multiple fields search for users
export const findUser: GQL_QueryResolvers["findUser"] = async (
  _,
  { input }
) => {
  try {
    // if any of the fields is included return the corresponding results
    let foundUsers: Array<GQL_User> | null = null;
    const { email, fullName, googleID, createdAt } = input;
    if (googleID)
      // search with googleID
      foundUsers = await UserCollection.find({ googleID: googleID });
    if (email) foundUsers = await UserCollection.find({ email: email }); // search by email
    // search by fullname & date
    if (fullName && createdAt) {
      foundUsers = await UserCollection.find({
        fullName: fullName,
        createdAt: createdAt,
      });
    }
    // search only by full name
    if (fullName)
      foundUsers = await UserCollection.find({ fullName: fullName });
    // search only by full date
    if (createdAt)
      foundUsers = await UserCollection.find({ createdAt: createdAt });
    return foundUsers; // results array
  } catch (e) {
    throw new Error(e.message);
  }
};
