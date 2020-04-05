import { GQL_AuthResponse } from "../schema/schema";

// function for returning any custom error
export const generateAuthError = (
  path: string,
  message: string
): GQL_AuthResponse => {
  return {
    token: null,
    success: false,
    errors: [{ path, message }],
  };
};

// fixed usual errors
export const WeakPassword: GQL_AuthResponse = {
  token: null,
  success: false,
  errors: [
    {
      path: "PASSWORD",
      message:
        "Your password is too weak. Must contains at least a letter, a number and a special character.",
    },
  ],
};

// error for wrong credentials
export const WrongCredits: GQL_AuthResponse = {
  token: null,
  success: false,
  errors: [{ path: "LOGIN", message: "Wrong Credentials" }],
};

// error for already singed user
export const AlreadySigned: GQL_AuthResponse = {
  token: null,
  success: false,
  errors: [{ path: "REGISTER", message: "Wow! You are already signed!" }],
};
