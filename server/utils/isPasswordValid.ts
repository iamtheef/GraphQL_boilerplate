import validator from "validator";
const { isEmpty } = validator;

export const isPasswordValid = (password: string): boolean => {
  if (isEmpty(password)) return false;
  return true;
};
