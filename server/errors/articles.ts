import { GQL_NewArticleResponse, GQL_EditArticleResponse } from "schema/schema";
import { Error } from "./ErrorInterface";

class ArticleError {
  success: boolean;
  errors: [Error];
  constructor(error: Error) {
    this.errors = [error];
  }
  throwError(): GQL_EditArticleResponse {
    return {
      success: false,
      errors: this.errors,
    };
  }
}

// error if the author id passed in wasn't correct or the user couldn't be found for any reason
export const UserNotFound = new ArticleError({
  path: "NEW ARTICLE",
  message: "Your profile couldn't be found.",
});

// error if the request isn't coming from the author of the article
export const Unauthorized = new ArticleError({
  path: "EDIT",
  message: "You are unauthorized for this action.",
});
