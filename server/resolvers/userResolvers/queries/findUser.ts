import { UserCollection } from "../../../models/index";
import { GQL_QueryResolvers } from "schema/schema";

// multiple fields search for users
export const findUser: GQL_QueryResolvers["findUser"] = async (
  _,
  { input }
) => {
  try {
    // if any of the fields is included return the corresponding results
    const { email, fullName, googleID, createdAt } = input;

    if (googleID) return await UserCollection.find({ googleID: googleID }); // search with googleID

    if (email) return UserCollection.find({ email: email }); // search by email

    // search by fullname & date
    if (fullName && createdAt)
      return await UserCollection.find({
        fullName: fullName,
        createdAt: createdAt,
      });

    // search only by full name
    if (fullName) return await UserCollection.find({ fullName: fullName });

    // search only by full date
    if (createdAt) return await UserCollection.find({ createdAt: createdAt });

    return []; // default case return
  } catch (e) {
    throw new Error(e.message);
  }
};
