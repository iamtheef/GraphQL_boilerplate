import knex from "@config/knex";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isGoogle: boolean;
  googleID: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Users = knex("users");
