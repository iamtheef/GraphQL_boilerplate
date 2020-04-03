import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { GQL_AuthResponse, GQL_User as User } from "schema/schema";

const secret = dotenv.config().parsed.SECRET;

// Generate Payload
export const payloadGen = ({ id }: User) => {
  return { id };
};

// Generate Tokens
export const tokenGen = (payload: {}): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

// Access Upon Successful Login
export const Access = (user: User): GQL_AuthResponse => {
  return {
    token: tokenGen(payloadGen(user)),
    success: true,
    errors: []
  };
};
