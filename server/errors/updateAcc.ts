import { GQL_UpdateAccResponse } from "../schema/schema";

export const generateUpdateError = (
  path: string,
  message: string
): GQL_UpdateAccResponse => {
  return {
    success: false,
    errors: [{ path, message }]
  };
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
