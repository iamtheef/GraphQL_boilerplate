import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { GQL_AuthResponse, GQL_User } from "schema/schema";

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
export const Access = (user: GQL_User): GQL_AuthResponse => {
  return {
    token: tokenGen(payloadGen(user)),
    success: true,
    errors: []
  };
};
