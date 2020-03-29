import { prop } from "@typegoose/typegoose";
import validator from "validator";
import { isFullNameValid } from "../utils/isNameValid";
import { isPasswordValid } from "../utils/isPasswordValid";

const { isEmail, isEmpty } = validator;

export class User {
  public _id: String;

  @prop({ validate: fullName => isFullNameValid(fullName) })
  fullName: String;

  @prop({ validate: email => isEmail(email) && !isEmpty(email), unique: true })
  email: String;

  @prop({ validate: password => isPasswordValid(password) })
  password: String;

  @prop({ default: false })
  isGoogle: Boolean;

  @prop({ default: null })
  googleID: String;

  @prop({ default: Date.now() })
  createdAt: Date;
}
