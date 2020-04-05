import { prop, arrayProp, Ref } from "@typegoose/typegoose";
import { Article } from "./Article";
import validator from "validator";
import { isFullNameValid } from "../utils/isNameValid";

const { isEmail, isEmpty } = validator;

export class User {
  public _id: String;

  @prop({ validate: (fullName) => isFullNameValid(fullName) })
  fullName: String;

  @prop({
    validate: (email) => isEmail(email) && !isEmpty(email),
    unique: true,
  })
  email: String;

  @prop()
  password: String;

  @prop({ default: false })
  isGoogle: Boolean;

  @prop({ default: null })
  googleID: String;

  @prop({ default: Date.now() })
  createdAt: Date;

  @arrayProp({ items: Article })
  public articles?: Ref<Article>[];
}
