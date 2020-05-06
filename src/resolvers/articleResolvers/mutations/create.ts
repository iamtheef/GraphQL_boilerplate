import { GQL_MutationResolvers } from "schema/schema";
import knex from "knex";
import { throwNewError } from "@errors/index";

export const createArticle: GQL_MutationResolvers["createArticle"] = async (
  _,
  { input },
  { req }
) => {
  try {
    return null;
    // const foundUser = await Users.findById(req.user.id);

    // const newArticle = {
    //   ...input,
    //   author: req.user.id,
    //   authorID: req.user.id,
    // };

    // const newArticleID = (await Articles.create(newArticle))._id;
    // // foundUser.articles.push(newArticleID);
    // await foundUser.save();

    // // responds
    // return {
    //   success: true,
    //   articleID: newArticleID,
    //   errors: [],
    // };
  } catch (e) {
    return throwNewError([`${e.message}`]); // server error handling
  }
};
