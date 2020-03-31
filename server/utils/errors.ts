import { AuthResponse, UpdateAccResponse } from "../schema/schema";

// function for returning any custom error
export const generateAuthError = (
  path: string,
  message: string
): AuthResponse => {
  return {
    token: null,
    success: false,
    errors: [{ path, message }]
  };
};

export const generateUpdateError = (
  path: string,
  message: string
): UpdateAccResponse => {
  return {
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

export const InvalidPassword: UpdateAccResponse = {
  success: false,
  errors: [
    { path: "USER PASSWORD", message: "Password was invalid, try again." }
  ]
};

export const MismatchedPasswords: UpdateAccResponse = {
  success: false,
  errors: [{ path: "PASSWORDS", message: "Passwords have to match!" }]
};
export const SuccessUpdated: UpdateAccResponse = {
  success: true,
  errors: []
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
