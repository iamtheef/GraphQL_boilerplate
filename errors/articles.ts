import {
  GQL_EditArticleResponse,
  GQL_RemoveArticleResponse,
} from "schema/schema";
// import { Error } from "./IError";

class ArticleError {
  success: boolean;
  errors: string[];
  constructor(errors: string[]) {
    this.errors = errors;
    this.success = !errors;
  }
  throwError(): GQL_EditArticleResponse & GQL_RemoveArticleResponse {
    return {
      success: this.success,
      errors: this.errors,
    };
  }
}

// error if the author id passed in wasn't correct or the user couldn't be found for any reason
export const UserNotFound = new ArticleError([
  "Your profile couldn't be found.",
]);

// error if the request isn't coming from the author of the article
export const UnauthorizedAction = new ArticleError([
  "You are unauthorized for this action.",
]);

// error if no user is logged in
export const NotLoggedIn = new ArticleError(["You are not logged in."]);
