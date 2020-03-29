import { AuthResponse } from "../schema/schema";

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

export const error: AuthResponse = {
  token: null,
  success: false,
  errors: [
    {
      path: "NETWORK",
      message:
        "Wooops, seems like we're having some trouble reaching the server. Try later"
    }
  ]
};
