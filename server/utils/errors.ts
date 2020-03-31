import { AuthResponse } from "../schema/schema";

// function for returning any custom error
export const generateError = (path: string, message: string): AuthResponse => {
  return {
    token: null,
    success: false,
    errors: [{ path, message }]
  };
};

// fixed usual errors
export const ValidationError: AuthResponse = {
  token: null,
  success: false,
  errors: [
    {
      path: "VALIDATION",
      message: "Validation failed, please check your form again!"
    }
  ]
};

export const WrongCredits: AuthResponse = {
  token: null,
  success: false,
  errors: [{ path: "LOGIN", message: "Wrong Credentials" }]
};

export const AlreadySigned: AuthResponse = {
  token: null,
  success: false,
  errors: [{ path: "REGISTER", message: "Wow! You are already signed!" }]
};

export const queryError: AuthResponse = {
  token: null,
  success: false,
  errors: [
    {
      path: "DATABASE",
      message: "Our database couldn't be reached. Try later"
    }
  ]
};
