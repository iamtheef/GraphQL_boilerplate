import { ArticleCollection } from "../../../models/index";
import { GQL_QueryResolvers, GQL_Article } from "schema/schema";

// multiple fields search for users
export const findArticle: GQL_QueryResolvers["findArticle"] = async (
  _,
  { input }
) => {
  try {
    // if any of the fields is included return the corresponding results
    let foundArticles: Array<GQL_Article> | null = null;
    const { title, keywords, authorID, createdAt } = input;

    console.log(
      await ArticleCollection.find({
        $text: {
          $search: "lol",
          $caseSensitive: true,
        },
      })
    );

    // // search with googleID
    // foundUsers = await UserCollection.find({ googleID: googleID });
    // if (email) foundUsers = await UserCollection.find({ email: email }); // search by email
    // // search by fullname & date
    // if (fullName && createdAt) {
    //   foundUsers = await UserCollection.find({
    //     fullName: fullName,
    //     createdAt: createdAt,
    //   });
    // }
    // // search only by full name
    // if (fullName)
    //   foundUsers = await UserCollection.find({ fullName: fullName });
    // // search only by full date
    // if (createdAt)
    //   foundUsers = await UserCollection.find({ createdAt: createdAt });
    return []; // results array
  } catch (e) {
    throw new Error(e.message);
  }
};
