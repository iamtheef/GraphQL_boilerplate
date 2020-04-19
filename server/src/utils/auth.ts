import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { GQL_AuthResponse, GQL_User } from "schema/schema";
import { Request } from "express";

const secret = dotenv.config().parsed.SECRET; // loads encryption salt from enviroment variables
type Payload = { id: string };

// Generate Payload
export const payloadGen = ({ id }: GQL_User): Payload => {
  return { id };
};

// Generate Tokens
export const tokenGen = (payload: Payload): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

// Access Upon Successful Login
export const Access = (req: Request, user: GQL_User): GQL_AuthResponse => {
  req.login(user, (err: any) => {
    if (err) {
      console.log(err);
    }
  });

  return {
    success: true,
    errors: [],
  };
};
