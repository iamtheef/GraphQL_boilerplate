import { GQL_AuthResponse } from "../schema/schema";
import { Error } from "./IError";

// exporting custom messages in the form of update account response
class UpdateAccError {
  success: boolean;
  errors: string[];
  constructor(error: string) {
    this.errors = [error];
  }
  throwError(): GQL_AuthResponse {
    return {
      success: false,
      errors: this.errors,
    };
  }
}

// error for preventing updating from forgotten login profile (checks the already in use password)
export const InvalidPassword = new UpdateAccError(
  "Password was invalid, try again."
);

// error for mismatched passwords
export const MismatchedPasswords = new UpdateAccError(
  "Passwords have to match!"
);

export const Unauthorized = new UpdateAccError(
  "You are unauthorized for this action, please login in first."
);
