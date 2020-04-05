import { GQL_MutationResolvers } from "schema/schema";
import { ArticleCollection, UserCollection } from "../../../models/index";
import { UserNotFound } from "../../../errors/articles";

export const createArticle: GQL_MutationResolvers["createArticle"] = async (
  _,
  { input }
) => {
  try {
    const foundUser = await UserCollection.findById(input.authorID); // first make sure the id is right
    if (!foundUser) return UserNotFound; // if no, return

    //create the artcile
    const newArticle = await ArticleCollection.create({
      ...input,
    });

    foundUser.articles.push(newArticle._id); //associate it with the user
    foundUser.save(); //saves the user after updating the `articles` array

    // responds
    return {
      success: true,
      articleID: newArticle._id,
      errors: [],
    };
  } catch (e) {
    throw Error(e.message); // server error handling
  }
};
