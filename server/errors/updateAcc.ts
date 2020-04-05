import { GQL_UpdateAccResponse } from "../schema/schema";

// function for exporting custom messages in the form of update account response (accepts `path` and `message` (both strings))
export const generateUpdateError = (
  path: string,
  message: string
): GQL_UpdateAccResponse => {
  return {
    success: false,
    errors: [{ path, message }],
  };
};

// error for preventing updating from forgotten login profile (checks the already in use password)
export const InvalidPassword: GQL_UpdateAccResponse = {
  success: false,
  errors: [
    { path: "USER PASSWORD", message: "Password was invalid, try again." },
  ],
};

// error for mismatched passwords
export const MismatchedPasswords: GQL_UpdateAccResponse = {
  success: false,
  errors: [{ path: "PASSWORDS", message: "Passwords have to match!" }],
};

// not really an error. confirmation that the profile has been updated (placed here for convinience)
export const SuccessUpdated: GQL_UpdateAccResponse = {
  success: true,
  errors: [],
};
