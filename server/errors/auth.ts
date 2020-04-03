import { GQL_AuthResponse } from "../schema/schema";

// function for returning any custom error
export const generateAuthError = (
  path: string,
  message: string
): GQL_AuthResponse => {
  return {
    errors: [{ path, message }]
  };
};

// fixed usual errors
export const ValidationError: GQL_AuthResponse = {
  token: null,
  success: false,
  errors: [
    {
      path: "VALIDATION",
      message: "Validation failed, please check your form again!"
    }
  ]
};

export const WrongCredits: GQL_AuthResponse = {
  token: null,
  success: false,
  errors: [{ path: "LOGIN", message: "Wrong Credentials" }]
};

export const AlreadySigned: GQL_AuthResponse = {
  token: null,
  success: false,
  errors: [{ path: "REGISTER", message: "Wow! You are already signed!" }]
};
