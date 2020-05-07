import { GQL_AuthResponse } from "../schema/schema";
import { Error } from "./IError";

// exporting custom messages in the form of update account response
class UpdateAccError {
  success: boolean;
  errors: string[];
  constructor(error: Error) {
    this.errors = [];
    this.success = !this.errors;
  }
  throwError(): GQL_AuthResponse {
    return {
      success: this.success,
      errors: this.errors,
    };
  }
}

// error for preventing updating from forgotten login profile (checks the already in use password)
export const InvalidPassword = new UpdateAccError({
  path: "USER PASSWORD",
  messages: ["Password was invalid, try again."],
});

// error for mismatched passwords
export const MismatchedPasswords = new UpdateAccError({
  path: "PASSWORDS",
  messages: ["Passwords have to match!"],
});

export const Unauthorized = new UpdateAccError({
  path: "UPDATE ACCOUNT",
  messages: ["You are unauthorized for this action, please login in first."],
});
