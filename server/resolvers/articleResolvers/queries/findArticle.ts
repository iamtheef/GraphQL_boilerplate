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
    const { keywords, authorID, createdAt } = input;

    // if (keywords.length) {
    //   const all = await ArticleCollection.find();
    //   foundArticles = all.filter((article) => article.title.includes(title));
    // }

    if (keywords.length) {
      foundArticles = await ArticleCollection.find({
        $text: { $search: `${keywords}`, $caseSensitive: false },
      });
    }

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
    return foundArticles; // results array
  } catch (e) {
    throw new Error(e.message);
  }
};
