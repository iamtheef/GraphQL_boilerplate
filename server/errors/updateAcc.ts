import { GQL_UpdateAccResponse } from "../schema/schema";
import { Error } from "./ErrorInterface";

// exporting custom messages in the form of update account response
class UpdateAccError {
  success: boolean;
  errors: [Error];
  constructor(error: Error) {
    this.errors = [error];
    this.success = !this.errors;
  }
  throwError(): GQL_UpdateAccResponse {
    return {
      success: this.success,
      errors: this.errors,
    };
  }
}

// error for preventing updating from forgotten login profile (checks the already in use password)
export const InvalidPassword = new UpdateAccError({
  path: "USER PASSWORD",
  message: "Password was invalid, try again.",
});

// error for mismatched passwords
export const MismatchedPasswords = new UpdateAccError({
  path: "PASSWORDS",
  message: "Passwords have to match!",
});
