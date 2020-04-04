import { prop, arrayProp, Ref } from "@typegoose/typegoose";
import validator from "validator";
import { isFullNameValid } from "../utils/isNameValid";
import mongoose from "mongoose";
import { ArticleModel } from "./Article";

const { isEmail, isEmpty } = validator;

export class UserModel {
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

  @arrayProp({ items: ArticleModel })
  public articles?: Ref<ArticleModel>[];
}
