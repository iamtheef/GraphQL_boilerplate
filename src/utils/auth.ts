import { GQL_AuthResponse, GQL_User } from "schema/schema";
import { Request } from "express";
import { throwNewError } from "@errors/index";

// Access Upon Successful Login
export const Access = (req: Request, user: GQL_User): GQL_AuthResponse => {
  req.login(user, (err: Error) => {
    if (err) {
      throw throwNewError([`${err}`]);
    }
  });

  return {
    success: true,
    errors: [],
  };
};
