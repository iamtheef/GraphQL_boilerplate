export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isGoogle: boolean;
  googleID: string;
  createdAt: Date;
  updatedAt: Date;
}
