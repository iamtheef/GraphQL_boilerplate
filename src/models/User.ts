export class User {
  static tableName = "users";

  _id!: string;
  fullName!: String;
  email!: String;
  password!: String;
  isGoogle!: Boolean;
  googleID: String;
  createdAt!: Date;
  isAdmin!: Boolean;
}
