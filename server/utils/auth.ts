import { User } from "../models/User";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { GQL_AuthResponse } from "../schema/schema";

const secret = dotenv.config().parsed.SECRET;

// Generate Payload
export const payloadGen = ({ _id }: User) => {
  return { _id };
};

// Generate Tokens
export const tokenGen = (payload: {}): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

// Access Upon Successful Login
export const Access = (user: User): GQL_AuthResponse => {
  return {
    token: tokenGen(payloadGen(user)),
    success: true
  };
};
