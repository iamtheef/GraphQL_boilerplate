import { Errors } from "../../misc/errors";

export interface RegistrationInput {
  input: {
    fullName: string;
    email: string;
    password: string;
    isGoogle: boolean;
  };
}

export interface GoogleRegistrationPayload {
  googleTokenId: string;
}

export interface RegistrationResponse {
  token?: string;
  success: boolean;
  errors: Errors;
}
