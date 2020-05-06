export interface User {
  id: Number;
  fullName: String;
  email: String;
  password: String;
  isGoogle: Boolean;
  googleID: String;
  createdAt: Date;
  isAdmin: Boolean;
}
