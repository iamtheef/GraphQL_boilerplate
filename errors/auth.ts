import { GQL_AuthResponse } from "../schema/schema";
import { Error } from "./IError";

class AuthError {
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

// error for weak password
export const WeakPassword = new AuthError(
  "Your password is too weak. Must be at least 8 characters long, must contains at least a letter, a number and a special character."
);

// error for wrong credentials
export const WrongCredits = new AuthError("Wrong Credentials");

// error for already singed user
export const AlreadySigned = new AuthError("Wow! You are already signed!");
