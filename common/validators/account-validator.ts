import { ValidationResponse } from "../types/misc/validation-response";
import validator from "validator";
import zxcvbn from "zxcvbn";

const { isEmail, isEmpty } = validator;

export interface RegistrationAccount {
  email: string;
  password: string;
  fullName: string;
}

export const isMailValid = (email: string): ValidationResponse => {
  if (isEmpty(email)) {
    return {
      isValid: false,
      errorMessage: "Email can't be blank",
      formValidationStatus: "warning"
    };
  }

  if (!isEmail(email)) {
    return {
      isValid: false,
      errorMessage: "Email isn't right",
      formValidationStatus: "warning"
    };
  }

  return {
    isValid: true,
    formValidationStatus: "success"
  };
};

export const isFullNameValid = (name: string): ValidationResponse => {
  if (isEmpty(name)) {
    return {
      isValid: false,
      errorMessage: "Το πληρες ονομα δεν μπορει να ειναι κενο ",
      formValidationStatus: "warning"
    };
  }

  if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
    return {
      isValid: false,
      errorMessage: "Το πληρες ονομα δεν ειναι σωστο",
      formValidationStatus: "warning"
    };
  }

  return {
    isValid: true,
    formValidationStatus: "success"
  };
};

export const isPasswordValid = (password: string): ValidationResponse => {
  if (isEmpty(password)) {
    return {
      isValid: false,
      formValidationStatus: "warning",
      errorMessage: "Ο κώδικος δεν μπορει να ειναι κενος"
    };
  }

  if (zxcvbn(password).score < 2) {
    // if (password.length < 5) {
    return {
      isValid: false,
      formValidationStatus: "warning",
      errorMessage: "Ο κώδικος δεν ειναι αρκετα δυνατος"
    };
  }

  return {
    isValid: true,
    formValidationStatus: "success"
  };
};

export const isAccountValid = (account: RegistrationAccount): boolean => {
  const { email, password, fullName } = account;

  if (
    isMailValid(email).isValid &&
    isPasswordValid(password).isValid &&
    isFullNameValid(fullName).isValid
  ) {
    return true;
  }

  return false;
};
