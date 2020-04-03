import { GQL_NewArticleResponse } from "schema/schema";

export const userNotFound: GQL_NewArticleResponse = {
  success: false,
  articleID: null,
  errors: [
    {
      path: "NEW ARTICLE",
      message: "Your profile couldn't be found."
    }
  ]
};
