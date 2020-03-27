import { UserRole } from "../entity/user";

export interface userQuery {
  id: string;
  email: string;
  fullName: string;
  isGoogle: boolean;
  googleID: string;
  role: UserRole;
}
