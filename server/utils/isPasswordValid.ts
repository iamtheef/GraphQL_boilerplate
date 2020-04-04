import validator from "validator";
const { isEmpty, isLength, isNumeric, isAlpha } = validator;
const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const isPasswordValid = (password: string): boolean => {
  if (isEmpty(password)) return false;
  if (!isLength(password, { min: 8 })) return false;
  if (isNumeric(password)) return false;
  if (isAlpha(password)) return false;
  if (!specialChars.test(password)) return false;
  return true;
};
