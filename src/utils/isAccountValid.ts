import { isPasswordValid } from "./isPasswordValid";
import { isFullNameValid } from "./isNameValid";
import validator from "validator";
import { GQL_RegisterInput } from "schema/schema";
const { isEmail } = validator;

export const isAccountValid = (user: GQL_RegisterInput) => {
  const { fullName, password, email } = user;
  const messages = [];

  if (!isPasswordValid(password)) messages.push("Password is not valid");
  if (!isFullNameValid(fullName)) messages.push("Name is not valid");
  if (!isEmail(email)) messages.push("Email is not valid");

  return {
    isValid: messages.length > 0,
    messages,
  };
};
