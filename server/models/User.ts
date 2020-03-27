import { prop } from "@typegoose/typegoose";
import * as validate from "../../common/validators/account-validator";
const { isFullNameValid, isMailValid, isPasswordValid } = validate;

export class User {
  public _id: string;

  @prop({ validate: fullName => isFullNameValid(fullName).isValid })
  fullName: String;

  @prop({ validate: email => isMailValid(email).isValid, unique: true })
  email: String;

  @prop({ validate: password => isPasswordValid(password).isValid })
  password: String;

  @prop({ default: false })
  isGoogle: Boolean;

  @prop({ default: null })
  googleID: String;

  @prop({ default: Date.now() })
  createdAt: Date;
}
