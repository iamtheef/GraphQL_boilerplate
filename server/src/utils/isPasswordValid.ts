import validator from "validator";
const { isEmpty, isLength, isNumeric, isAlpha } = validator;
const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // regex for special characters

export const isPasswordValid = (password: string): boolean => {
  /// requirements for the password (if any of these fail returns false)
  if (isEmpty(password)) return false; // checks if empty
  if (!isLength(password, { min: 8 })) return false; // checks length (minimun 8 characters)
  if (isNumeric(password)) return false; // checks if the password is only numbers
  if (isAlpha(password)) return false; // checks if the password in only letters
  if (!specialChars.test(password)) return false; // checks if the password contains special characters
  return true;
};
