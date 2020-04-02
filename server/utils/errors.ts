import { GQL_AuthResponse, GQL_UpdateAccResponse } from "../schema/schema";

// function for returning any custom error
export const generateAuthError = (
  path: string,
  message: string
): GQL_AuthResponse => {
  return {
    errors: [{ path, message }]
  };
};

export const generateUpdateError = (
  path: string,
  message: string
): GQL_UpdateAccResponse => {
  return {
    success: false,
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

export const InvalidPassword: GQL_UpdateAccResponse = {
  success: false,
  errors: [
    { path: "USER PASSWORD", message: "Password was invalid, try again." }
  ]
};

export const MismatchedPasswords: GQL_UpdateAccResponse = {
  success: false,
  errors: [{ path: "PASSWORDS", message: "Passwords have to match!" }]
};
export const SuccessUpdated: GQL_UpdateAccResponse = {
  success: true,
  errors: []
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
