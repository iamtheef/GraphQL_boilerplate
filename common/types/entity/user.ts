// the returned payload inside the token
export interface UserPayload {
  _id: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  isGoogle: boolean;
  googleId: string;
  createdAt: string;
}

export interface UserPartial extends Partial<User> {}
