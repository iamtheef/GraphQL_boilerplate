import { GQL_NewArticleResponse } from "schema/schema";

// error if the author id passed in wasn't correct or the user couldn't be found for any reason
export const UserNotFound: GQL_NewArticleResponse = {
  success: false,
  articleID: null,
  errors: [
    {
      path: "NEW ARTICLE",
      message: "Your profile couldn't be found.",
    },
  ],
};
