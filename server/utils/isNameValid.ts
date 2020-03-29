import validator from "validator";
const { isEmpty } = validator;

export const isFullNameValid = (name: string): boolean => {
  if (isEmpty(name) || !/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
    return false;
  }
  return true;
};
