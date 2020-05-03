import validator from "validator";
const { isEmpty } = validator;

export const isFullNameValid = (name: string): boolean => {
  // checks if the username is empty or if it has the right form
  if (isEmpty(name) || !/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
    return false;
  }
  return true;
};
