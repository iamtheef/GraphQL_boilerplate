import { LoginResponse } from "../../common/types/api/auth/login";
import { RegistrationResponse } from "../../common/types/api/auth/register";
import { ErrorResponse } from "../../common/types/misc/errors";

export const error: ErrorResponse = {
  token: null,
  success: false,
  errors: [{ path: "DATABASE OR NETWORK", message: "Error" }]
};

export const WrongCredits: LoginResponse = {
  token: null,
  success: false,
  errors: [{ path: "LOGIN", message: "Wrong Credentials" }]
};

export const AlreadySigned: RegistrationResponse = {
  token: null,
  success: false,
  errors: [{ path: "REGISTER", message: "Wow! You are already signed!" }]
};

export const queryError: RegistrationResponse = {
  token: null,
  success: false,
  errors: [
    {
      path: "DB",
      message: "Wooops, our database couldn't be reached. Try later"
    }
  ]
};
